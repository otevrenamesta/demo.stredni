
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
      let url = `${this.$props.data.url}?&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.items = dataReq.data.data
    } catch (_) {
      this.$data.items = [{ title: 'formsAnnonce: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
  <div class="section menu">
    <h2 class="menu-label title is-5">{{ data.title }}</h2>

    <ul class="menu-list" v-if="loaded">
      <li v-for="i,idx in items" :key="idx">
        <router-link :to="'/formulare/' + i.id">{{ i.title }}</router-link>
      </li>
    </ul>
    
    <div class="my-5">
      <router-link :to="data.detail_link">
        <button class="button is-primary is-fullwidth">
          {{ data.detail_title || 'detaily' }} >> 
        </button>
      </router-link>
    </div>
  </div>
  `
}
