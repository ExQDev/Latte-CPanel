<template>
  <div class="store-container">
    <div class="gems-list">
      <div v-for="gem in gems" v-bind:key="gem.id" class="gem-item" @click="gemDetails(gem.id)">
        <img :src="gem.thumbnail" :alt="gem.name" class="gem-item-thumb"/>
        <div class="gem-item-content">
          <span class="gem-item-title">{{gem.name}}</span>
          <p class="gem-item-desc">{{gem.shortdesc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gems: [
        {
          id: 1,
          name: 'PLY',
          thumbnail: 'https://raw.githubusercontent.com/ash-j-f/PLY-public/master/preview.png',
          shortdesc: 'PostgreSQL multi-threaded connector'
        },
        {
          id: 2,
          name: 'SQLite',
          thumbnail: 'https://raw.githubusercontent.com/alatnet/Lumberyard-SQLite-Gem/master/preview.png',
          shortdesc: 'An Amazon Lumberyard Gem that adds in SQLite functionality. '
        },
        {
          id: 3,
          name: 'MutiplayerCharacterGem',
          thumbnail: 'https://raw.githubusercontent.com/quinlayen/Lumberyard-MutiplayerCharacterGem/master/preview.png',
          shortdesc: 'No description'
        },
        {
          id: 4,
          name: 'Alternative Audio System',
          thumbnail: 'https://raw.githubusercontent.com/alatnet/Lumberyard-Alternative-Audio-Gem/master/preview.png',
          shortdesc: 'An alternative audio system for usage in Amazon Lumberyard '
        },
        {
          id: 5,
          name: 'Substance NG Gem',
          thumbnail: 'https://raw.githubusercontent.com/roche-emmanuel/LYSubstanceNG/master/preview.png',
          shortdesc: 'SubstanceNG is a re-implementation og the Substance Gem provided by default for Lumberyard'
        },
        {
          id: 6,
          name: 'DynamicMesh',
          thumbnail: 'https://bitbucket.org/petrocket/dynamicmesh/raw/8e93594f535c6ab737f0715b20faa57a001fb92c/preview.png',
          shortdesc: 'No description'
        },
        {
          id: 7,
          name: 'Chroma',
          thumbnail: 'https://raw.githubusercontent.com/Razer-TionThomas/Razer-Lumberyard/master/Chroma/preview.png',
          shortdesc: 'Lumberyard Chroma Gem Library to add RGB lighting to Razer PC devices '
        }
      ]
    }
  },
  methods: {
    gemDetails (id) {
      this.$router.push(`/gem/${id}`)
    }
  }
}
</script>

<style>

.store-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
}

.gems-list {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px;
  align-self: center;
}

.gem-item {
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 3px;
  transition: all .25s linear;
}

.gem-item:not(:last-child) {
  border-bottom: 1px solid gray;
}

.gem-item-thumb {
  width: 300px;
  height: 100%;

}

.gem-item-title {
  margin-left: 15px;
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
}

.gem-item-desc {
  margin: 15px;
  font-size: 18px;
  white-space: pre-line;
}

.gem-item-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

</style>
