var express = require('express')
var serveStatic = require('serve-static')
var path = require('path')
var app = express()
app.use(serveStatic(path.join(__dirname, '/dist')))
var http = require('http').Server(app);
var srv = require('socket.io')(http);


import methods from './src/api/index.mjs'
var client = require('./src/utils/db')

(async () => {
  const db = (await client.connect()).db('latte');
  
  srv.on('error', (reason) => {
    console.error('SRV Error', reason);
  })
  srv.on('connect_error', function(err) {
    console.error('SRV Error', err);
  });
  
  
  srv.on('connection', (socket) => {
    console.log('..new connection')
    let user, activity;
  
    socket.on('error', (reason) => {
      console.error('Socket Error', reason);
    })
    socket.on('connect_error', function(err) {
      console.error('Socket Error', err);
    });
  
    socket.on('disconnect', async (reason) => {
      console.error('Socket Disconnect', reason);
      if(user)
        await db.collection('users').updateOne( { _id: user._id }, { $set: user } );
  
      if(activity)
        await db.collection('time').updateOne({_id: activity._id}, { $set: activity });
    })
  
    socket.on('action', async (payload, cb) => {
      // console.log('before', activity);
      payload = { ...payload, db, id: user ? user._id : undefined, user: payload.user ? payload.user : user, activity };
      if(payload.method != "track")
        console.log(payload.method)
      let result = await methods[payload.method](payload);
      // console.log(result);
      
      if(result[0] == 'signin-ok' || result[0] == 'user')
        user = result[1];
  
      if(result[0] == 'activity')
        activity = result[1];
  
      if(result[0] == 'stopped')
        activity = null;
  
      if(cb)
        cb(result);
      else
        socket.emit(...result);
  
      // console.log('after', activity);
    })
  });
  
  
  
  // var port = process.env.PORT || 5000
  // app.listen(port)
  // console.log('server started ' + port)
  
  http.listen(process.env.PORT || 5000, function(){
    console.log(`listening on *:${process.env.PORT || 5000}`);
  });
})()
