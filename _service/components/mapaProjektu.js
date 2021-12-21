import addProjectMap from 'https://modurad.otevrenamesta.cz/adminmodules/projekty/mapa/app.js'
const TagSelector = {
  data: function () {
    return {
      selected: null,
      loaded: false
    }
  },
  created: async function () {
    try {
      
    } catch (_) {
      alert('mapaProjektu: data.cfgUrl spatne')
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  methods: {
    select: function (i) {
      this.$data.selected = i.value
      this.$props.doSelect(i)
    }
  },
  template: `
  <div v-if="loaded" class="tabs is-toggle is-centered">
    <ul>
      <li v-for="i, idx in $data.typeOpts" :key="idx" 
        :class="$data.selected === i.value ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="select(i)">{{ i.text }}</a>
      </li>
    </ul>
  </div>
  `
}

export default {
  created: async function () {
    try {
      await this.$store.dispatch('loadScript', 
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet-src.js')
      await this.$store.dispatch('loadStyle', 
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css')

      addProjectMap('mapContainer', this.data.startLat, this.data.startLng, 13, this.data.url)
    } catch (_) {
      this.$data.items = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  computed: {
    style: function () {
      return {
        width: '100%',
        height: `${this.data.height || 400}px`
      }
    }
  },
  methods: {
    load: async function (opt) {
      try {
        // const filter = (!opt || !opt.value) ? null : {
        //   tags: { like: "%" + opt.value + "%" }
        // }
      } catch (_) {
        this.$data.items = [{ title: 'newsPreview: asi spatne url v datech' }]
      } finally {
        this.$data.loaded = true
      }
    }
  },
  props: ['data'],
  // components: { TagSelector },
  template: `
<div :class="data.class">
  <div id="mapContainer" :style="style"></div>
</div>
  `
}
