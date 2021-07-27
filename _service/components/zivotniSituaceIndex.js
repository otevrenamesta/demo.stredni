export default {
  computed: {
    items: function () {
      return items
    }
  },
  created: async function () {
    try {
      const count = this.$props.data.pocet || 5
      let url = `${this.$props.data.url}?sort=cas:asc&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.items = dataReq.data.data
    } catch (_) {
      this.$data.items = [{ title: 'kalendarBest: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
<div class="zivotnisituace section content" :class="data.class">
  <h2 class="title is-2">{{ data.title }}</h2>
  <ul>
    <router-link v-for="i, idx in items" :key="idx" :to="i.link">
      <li>{{ i.title }}</li>
    </router-link>
  </ul>

  <router-link v-if="data.detail_link" :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
`
}