export default {
  data: function () {
    return {
      items: null,
      loaded: false
    }
  },
  created: async function () {
    try {
      const count = this.$props.data.pocet
      let url = `${this.$props.data.url}?sort=published:asc`
      if (count) url = `${url}&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.items = count ? dataReq.data.data : dataReq.data
    } catch (_) {
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
<div :class="data.class">
  
  <h2 class="title is-2">{{ data.title }}</h2>

  <div v-if="loaded" class="content">
    <ul>
      <li v-for="i, idx in items" :key="idx">{{ i.title }}</li>
    </ul>
  </div>
  
  <router-link v-if="data.detail_link" :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
  `
}