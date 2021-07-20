
export default {
  data: function () {
    return {
      items: null
    }
  },
  created: async function () {
    try {
      const dataReq = await axios.get(this.$props.data.url, { params: {
        sort: 'published:asc',
        currentPage: 1,
        perPage: this.$props.data.pagesize
      }})
      this.$data.items = dataReq.data.data
    } catch (_) {
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    }
  },
  props: ['data'],
  template: `
  <div>
    <div class="columns is-flex-wrap-wrap">
      <div v-for="(i, idx) in items" :key="idx" class="column is-3">

        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="$store.getters.mediaUrl(i.obrazek, 'w=640')" :alt="i.title">
            </figure>
          </div>
          <div class="card-content">

            <h3 class="title">{{ i.title }}</h3>        
            <h4 class="subtitle">{{ i.perex }}</h4>
    
            <router-link :to="'/novinky/' + i.id">
              <button class="button is-primary">
                Více&nbsp;<i class="fas fa-angle-right"></i>
              </button>
            </router-link>

          </div>
        </div>

      </div>
    </div>

    <paginator />
  </div>
  `
}
