
export default {
  data: function () {
    return {
      loaded: false,
      items: null
    }
  },
  created: async function () {
    try {
      const count = this.$props.data.pocet || 5
      let url = `${this.$props.data.url}?sort=cas:asc&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.items = dataReq.data.data
    } catch (_) {
      this.$data.items = [{ title: 'newsPreview: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
  <div class="section">
    <h2 class="title is-2">{{ data.title }}</h2>

    <div v-if="loaded" v-for="i,idx in items" :key="idx">
      <router-link :to="'/posts/' + i.id">
        <h3 class="title is-3">{{ i.title }}</h3>
        <h4 class="subtitle is-4">{{ i.cas | longDate }}</h4>
      </router-link>
    </div>
    
    <router-link class="my-5" v-if="data.detail_link" :to="data.detail_link">
      <button class="button is-primary is-fullwidth">
        {{ data.detail_title || 'detaily' }} >> 
      </button>
    </router-link>
  </div>
  `
}
