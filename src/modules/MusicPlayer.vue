<template>
  <div id="container">
    <div id="toppan">
      <div id="leftpan">
        <div id="meta">
          <span id="title">
            {{meta.title}}
          </span>
          <span id="subtitle">
            {{meta.pos}} | <a :href="meta.author.channel_url">{{meta.author.name}}</a>
          </span>
        </div>
        <div id="player">
          <div id="controls">
            <!-- <a class="control-button">
              <i class="icon las la-stop"></i>
            </a> -->
            <a class="play-button" @click="pplay">
              <i :class="pclass"></i>
            </a>
            <a class="control-button" @click="next">
              <i class="icon las la-step-forward"></i>
            </a>
          </div>
          <div>

          </div>
          <div
            id="waveform"
            :data-wave-color="(isDark ? '#grey' : '#D9DCFF')"
            :data-progress-color="(isDark ? '#fff' : '#4353FF')">
          </div>
        </div>
      </div>
      <div id="rightpan">
        <img :src="meta.thumb" height="280">
      </div>
    </div>
    <div id="bottompan">
      <div id="playlist">
        <div class="song" v-for="song in queue" v-bind:key="song.videoId">
          <a class="control-button" @click="skipTo(song.videoId)">
            <i class="icon las la-fast-forward"></i>
          </a>
          <div class="songInfo">
            <p>{{song.title}}</p>
            <p>{{song.author.name}}</p>
          </div>
          <div>
            {{song.duration}}
          </div>
        </div>
      </div>
    </div>
    <!-- <av-bars
      audio-src="/static/All Good Things - For The Glory (Official).mp3"
      :canv-width="500"
      :canv-height="120"
      :playtime-line-width="3"
      :noplayed-line-width="3"
      :played-line-color="'grey'"
      :noplayed-line-color="'#fff'"
      :playtime="false"
      :playtime-with-ms="false"
      :playtime-slider="false"
      :playtime-slider-color="'transparent'"
    ></av-bars> -->
  </div>
</template>

<script>
import { Duration } from 'luxon'
import WaveSurfer from 'wavesurfer.js'
// import axios from 'axios'
// import ytdl from 'ytdl-core'
// import HttpsProxyAgent from 'https-proxy-agent'
// import ss from '@sap_oss/node-socketio-stream'
// import stb from 'stream-to-blob-url'
// const prox = 'http://user:pass@160.19.232.85:3128'
// const agent = HttpsProxyAgent(prox)

export default {
  name: 'Music',
  data: () => ({
    wavesurfer: null,
    // proxy: '160.19.232.85:3128', // '140.227.61.25:58888'
    queue: [],
    meta: {
      title: 'Title',
      author: {
        name: 'Author',
        channel_url: ''
      },
      album: 'Album'
    },
    mupd: -1
  }),
  async mounted () {
    if (!this.wavesurfer) this.createWaveSurfer()
    this.mupd = setInterval(() => {
      this.$socket.client.emit('action', {
        method: 'gettrack',
        guild: this.$store.state.currentGuild.id
      })
    }, 1000)
    // this.$socket.client.emit('action', {
    //   method: 'getsoundtrack',
    //   guild: this.$store.state.currentGuild.id
    // })
  },
  beforeDestroy () {
    clearInterval(this.mupd)
  },
  created () {
    // this.$socket.client
    //   .on('soundtrack-stream', async (stream, { stat }) => {
    //     console.log(stream)
    //     this.$Progress.start()
    //     stream.on('data', (data) => {
    //       // calculate loading process rate
    //       const loadRate = (data.length * 100) / stat.size
    //       this.$Progress.set(loadRate)
    //       // onLoadProcess(loadRate);
    //       // next step here
    //     })
    //     const blob = await stb(stream)
    //     const blobUrl = URL.createObjectURL(blob)
    //     this.aud = blobUrl
    //     this.wavesurfer.load(this.aud)
    //     this.$Progress.finish()
    //   })
    this.$socket.$subscribe('queue', async (queue) => {
      this.queue = queue
      console.log(queue)
    })
    this.$socket.$subscribe('audioprogress', async ({dd, dl}) => {
      const loadRate = (dd * 100) / dl
      console.log(dd, dl)
      this.$Progress.set(loadRate)
    })
    this.$socket.$subscribe('soundtrack', async (fl) => {
      this.audioBlob = 'http://82.193.104.224/' + fl
      console.log(this.audioBlob)
      // this.streaming = false

      // this.audioBlob = URL.createObjectURL(this.stream)

      // const link = document.createElement('a')
      // link.href = this.audioBlob
      // link.download = this.meta.title + '.mp3'
      // link.click()
      // link.remove()
      this.wavesurfer.load(
        this.audioBlob
      )
      this.streaming = false
      this.$Progress.finish()
    })
    this.$socket.$subscribe('track', async (track) => {
      const dur = Duration.fromMillis(track.time)
      this.meta = {
        ...track,
        pos: dur.toFormat('mm:ss')
      }
      if (this.audioBlob) {
        // console.log(track.time / 1000)
        // console.log(this.wavesurfer.getDuration())
        // this.wavesurfer.load(
        //   this.audioBlob
        // )
        this.wavesurfer.setCurrentTime(track.time / 1000)
      }
      if (track.status === 'Playing.') {
        this.wavesurfer.play()
      } else {
        this.wavesurfer.pause()
      }
      // console.log(this.songUrl !== track.url, track.url, this.streaming)
      if (this.songUrl !== track.url && !!track.url && !this.streaming) {
        console.log('NEW')
        this.$socket.client.emit('action', {
          method: 'getQueue',
          guild: this.$store.state.currentGuild.id
        })
        this.streaming = true
        this.songUrl = track.url
        // this.$Progress.start()
        this.$socket.client.emit('gettrack', {
          guild: this.$store.state.currentGuild.id
        })

        // this.stream = ytdl(track.url, {
        //   quality: 'lowestaudio',
        //   highWaterMark: 1 << 25,
        //   requestOptions: { agent }
        // })
        // this.stream.on('progress', (ln, dd, dl) => {
        //   // calculate loading process rate
        //   const loadRate = (dd * 100) / dl
        //   console.log(ln, dd, dl)
        //   this.$Progress.set(loadRate)
        //   // onLoadProcess(loadRate);
        //   // next step here
        // })

        // this.stream.on('end', async function () {
        //   console.log('finish')
        //   this.streaming = false
        //   this.audioBlob = await stb(this.stream)
        //   this.wavesurfer.load(
        //     this.audioBlob
        //   )
        // })
      }
      // console.log(this.meta)
    })
  },
  computed: {
    isDark () {
      return localStorage.getItem('theme') === 'dark'
    },
    pclass () {
      if (this.meta && this.meta.status) {
        switch (this.meta.status) {
          case 'Paused.':
            return 'icon las la-play-circle'
          case 'Not started.':
            return 'icon las la-microphone-slash'
          case 'Started. Nothing to play.':
            return 'icon las la-times-circle'
          case 'Playing.':
            return 'icon las la-pause-circle'
          default:
            return 'icon las la-play-circle'
        }
      } else {
        return 'icon las la-microphone-slash'
      }
    }
  },
  methods: {
    pplay () {
      this.$socket.client.emit('action', {
        method: 'm_play',
        guild: this.$store.state.currentGuild.id
      })
    },
    next () {
      this.$socket.client.emit('action', {
        method: 'm_next',
        guild: this.$store.state.currentGuild.id
      })
      this.stream = null
      this.songUrl = null
    },
    createWaveSurfer () {
      const waveform = document.querySelector('#waveform')
      console.log(waveform)
      this.wavesurfer = WaveSurfer.create({
        container: waveform,
        barWidth: 3,
        barRadius: 3,
        width: 720,
        cursorColor: '#ddd',
        progressColor: '#4353FF'
      })
      this.wavesurfer.setMute(true)
      // this.wavesurfer.on('seek', (pos) => {
      //   this.$socket.client.emit('action', {
      //     method: 'm_seek',
      //     pos
      //   })
      // })
      // this.wavesurfer.load(
      //   '/static/All Good Things - For The Glory (Official).mp3'
      // )
    }
  }
}
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
}

#toppan {
  display: flex;
  flex-direction: row;
}

#leftpan {
  width: 70%;
  padding-top: 20px;
}

#rightpan {
  width: 30%;
}

#playlist {
  display: flex;
  flex-direction: column;
  /* height: 60vh; */
  overflow-y: auto;
  scroll-behavior: smooth;
}

.song {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.songInfo {
  width: 90%;
  text-align: left;
}

.songInfo p {
  margin-top: 2px;
  margin-bottom: 2px;
}

#player {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-items: baseline;
  width: 100%;
}

#controls {
  display: flex;
  justify-items: center;
  align-items: center;
}

#waveform {
  width: 100%;
}

.control-button {
  font-size: 48px;
  cursor: pointer;
  transition: all .25s ease-in-out;
}

.control-button:hover {
  color: #4353FF;
}

.play-button {
  font-size: 84px;
  cursor: pointer;
  transition: all .25s ease-in-out;
}

.play-button:hover {
  color: #4353FF;
}

#meta {
  text-align: left;
  display: flex;
  flex-direction: column;
}

#title {
  font-size: 48px;
  text-decoration: underline;
}

#subtitle {
  font-size: 24px;
  color: gray;
}
</style>
