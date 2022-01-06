export default {
  data: function () {
    return {
      item: null,
      loading: true
    }
  },
  computed: {
    profile: function () {
      const u = this.$store.state.user
      try {
        return this.$store.getters.userLogged ? {
          jmeno: u.CurrentFamilyName,
          prijmeni: u.CurrentGivenName,
          id: u['ZR10 IdType'] + u['ZR10 IdNumber'],
          obec: u.CurrentAddress.PostName,
          psc: u.CurrentAddress.PostCode,
          narozeni: u.DateOfBirth,
          email: u.Email
        } : null
      } catch (_) {
        return null
      }
    }
  },
  created: async function () {
    try {
      const id = this.$router.currentRoute.params.id
      const url = `https://modurad.otevrenamesta.cz/omstredni/uni/forms/?filter={"id":${id}}`
      const dataReq = await axios.get(url)
      this.$data.item = dataReq.data[0]
    } catch (_) {
      this.$data.item = { title: 'detailPage.form.js: asi spatne url v datech' }
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
        // { vmid: 'description', name: 'description', content: this.$data.item.perex },
        // { vmid: 'keywords', name: 'keywords', content: this.$data.item.keywords }
      ],
      noscript: [
        { innerHTML: 'Tento web potřebuje zapnutý JavaScript.' }
      ]
    } : {}
  },
  components: {
    DynamicForm: () => import('../dynamicForm.js')
  },
  template: `
  <div>

  <pageHeader />

  <div class="container">

    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <section v-else class="section">
    
      <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
        <ul>
          <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
          <li><router-link to="/formulare">Formuláře</router-link></li>
        </ul>
      </nav>
      
      <h1 class="title">{{item.title}}</h1>

      <DynamicForm :cfg="item" :data="profile">
        <template v-slot:submitbuttons="{ hasErrors, submitting }">
          <div class="field has-addons">
            <p class="control">
              <button class="button is-success" 
                  :disabled="submitting || hasErrors"
              >
                <span class="icon is-small"><i class="fas fa-bold"></i></span>
                <span>Odeslat</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-danger" 
                :disabled="submitting || hasErrors"
              >
                <span class="icon is-small"><i class="fas fa-italic"></i></span>
                <span>Stáhnout PDF</span>
              </button>
            </p>
            <p class="control">
              <button class="button is-warning" 
                  :disabled="submitting || hasErrors"
              >
                <span class="icon is-small">
                  <i class="fas fa-underline"></i>
                </span>
                <span>Poslat datovkou</span>
              </button>
            </p>
          </div>
        </template>
      </DynamicForm>

      <div class="notification is-info">
        <span class="icon is-large"><i class="fas fa-info-circle"></i></span>
        Přihlášení uživatelé mohou formulář odeslat přímo.
        Další možnosti: formulář vytisknout a donést na podatelnu,
        nebo poslat datovou schránkou.
      </div>

    </section>

  </div>

  <pageFooter />

</div>
  `
}