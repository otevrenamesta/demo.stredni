
export default {
  data: function () {
    return {
      loaded: false,
      archive: [],
      items: null
    }
  },
  created: async function () {
    try {
      let url = `${this.$props.data.url}?filter={"status":"open"}`
      const dataReq = await axios.get(url)
      this.$data.items = dataReq.data
      const archiveFilter = { not: { status: 'open' } }
      const archiveReq = await axios.get(`${this.$props.data.url}?filter=${JSON.stringify(archiveFilter)}`)
      this.$data.archive = archiveReq.data
    } catch (err) {
      alert(err)
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
  <div v-if="loaded">
    <span v-if="items.length === 0">Není žádná aktuální výzva</span>
    <h2 v-else v-for="i,idx in items" class="title">
      {{ i.nazev }}
    </h2>

    <h4>archiv výzev</h4>
    <ul class="menu-list" v-if="loaded">
      <li v-for="i,idx in items" :key="idx">
        <router-link :to="data.detail_link + '/' + i.id">
          <h3 class="title is-4">{{ i.title }}</h3>
          <h4 class="subtitle is-6">
            {{ i.cas | longDate }} / {{ i.misto }}
          </h4>
        </router-link>
      </li>
    </ul>
    
  </div>
  `
}
