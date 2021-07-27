
export default {
  data: function () {
    return {
      items: null,
      loading: true
    }
  },
  created: async function () {
    try {
      const dataReq = await axios.get('/uniapi/forms/', { params: {
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
  <div>

  <pageHeader />

  <div class="container">

    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <section v-else class="section">
    
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
          <li class="is-active"><a href="#" aria-current="page">Formuláře</a></li>
        </ul>
      </nav>
      
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
  </div>

  <pageFooter />

</div>
  `
}
