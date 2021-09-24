export default {
  data: function () {
    return {
      item: null,
      loading: true
    }
  },
  created: async function () {
    try {
      const id = this.$router.currentRoute.params.id
      const url = `/api/uni/events/?filter={"id":${id}}`
      const dataReq = await axios.get(url)
      this.$data.item = dataReq.data[0]
    } catch (_) {
      this.$data.item = { title: 'newestItemsText: asi spatne url v datech' }
    } finally {
      this.$data.loading = false
    }
  },
  metaInfo () {
    return this.$data.item ? {
      htmlAttrs: {
        lang: this.$data.item.lang || 'cs'
      },
      title: this.$data.item.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.$data.item.perex },
        // { vmid: 'keywords', name: 'keywords', content: this.$data.item.keywords }
      ],
      noscript: [
        { innerHTML: 'Tento web potřebuje zapnutý JavaScript.' }
      ]
    } : {}
  },
  template: `
<div>

  <pageHeader />

  <div class="container">

    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <section v-else class="section">
    
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
          <li><router-link to="/kalendar">Kalendář</router-link></li>
        </ul>
      </nav>
      
      <h1 class="title">{{item.title}}</h1>

      <h4 class="subtitle is-6">{{ item.cas | longDate }}</h4>

      <img v-if="item.obrazek" :src="item.obrazek" />

      <div class="content">
        <markdown :text="item.content" />
      </div>

    </section>

  </div>

  <pageFooter />

</div>
  `
}