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
      this.$data.posts = [{ title: 'newestItemsText: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
<div :class="data.class" class="menu">
  
  <h2 class="menu-label title is-2">{{ data.title }}</h2>

  <ul class="menu-list" v-if="loaded">
    <li v-for="i, idx in items" :key="idx">{{ i.title }}</li>
  </ul>
  
  <div class="my-5">
    <router-link v-if="data.detail_link" :to="data.detail_link">
      <button class="button is-primary is-fullwidth">
        {{ data.detail_title || 'detaily' }} >> 
      </button>
    </router-link>
  </div>

</div>
  `
}