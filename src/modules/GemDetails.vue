<template>
  <div>
    <div class="head-card">
      <h1>{{gem.name}}</h1>
      <div class="head-card-row">
        <img :src="gem.thumbnail" class="gem-preview"/>
        <div class="gem-info">
          <div class="gem-fast-links">
            <VButton :onclick="to(gem.repo)" class="gem-fast-link" name="b-code">Code</VButton>
            <VButton :onclick="to(gem.dlink)" class="gem-fast-link" name="b-dload">Download</VButton>
          </div>
          <p><strong>Description:</strong> {{gem.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from '@/components/Button'

export default {
  components: {
    VButton
  },
  data () {
    return {
      gem: {
        id: 0,
        name: 'Default',
        thumbnail: '',
        shortdesc: 'Default',
        description: 'Default'
      },
      gems: [
        {
          id: 1,
          name: 'PLY',
          thumbnail: 'https://raw.githubusercontent.com/ash-j-f/PLY-public/master/preview.png',
          shortdesc: 'PostgreSQL multi-threaded connector',
          description: 'PLY stands for "PostgreSQL for Lumberyard". While Amazon provides Gems (self contained packages) for connecting to databases on its AWS cloud services, PLY is a C++ based solution for connecting to your own self-hosted PostgreSQL database instances (either remotely or locally).',
          repo: 'https://github.com/ash-j-f/PLY-public',
          dlink: 'https://github.com/ash-j-f/PLY-public/archive/master.zip'
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
    getGem () {
      const { id } = this.$route.params
      const gem = this.gems.filter(gem => gem.id === +id)[0]
      this.gem = gem || this.gem
    },
    to (link) {
      return () => {
        window.open(link)
      }
    }
  },
  mounted () {
    this.getGem()
  }
}
</script>

<style>
  .head-card {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 20px;
  }
  .head-card-row {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    justify-content: space-between;
  }
  .gem-preview {
    max-width: 50%;
  }
  .gem-info {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: start;
    text-align: left;
    padding: 10px;
  }
  .gem-fast-links {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }
  .gem-fast-link {
    margin-right: 10px;
  }
</style>
