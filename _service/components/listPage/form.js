
export default {
  data: function () {
    return {
      items: null,
      loading: true
    }
  },
  props: ['data'],
  created: async function () {
    try {
      const dataReq = await axios.get(this.data.url, { params: {
        sort: 'title:asc',
        currentPage: 1,
        perPage: 10
      }})
      this.$data.items = dataReq.data.data
    } catch (_) {
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    } finally {
      this.$data.loading = false
    }
  },
  props: ['data'],
  template: `
    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <section v-else class="section">
      
      <div class="columns is-flex-wrap-wrap">
        <div v-for="(i, idx) in items" :key="idx" class="column is-3">

          <div class="card">

            <div class="card-content">

              <h3 class="title is-5 is-capitalized">{{ i.title }}</h3>
      
              <router-link :to="'/formulare/' + i.id">
                <button class="button is-primary">
                  Vyplnit&nbsp;<i class="fas fa-angle-right"></i>
                </button>
              </router-link>

            </div>
          </div>

        </div>
      </div>

      <paginator />

    </section>
  `
}
