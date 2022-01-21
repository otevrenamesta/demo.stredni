
export default {
  data: function () {
    return { expanded: false }
  },
  methods: {
    logout: async function () {
      const r = await axios.get('https://modurad.otevrenamesta.cz/mutabor/nia/logout', { withCredentials: true })
      localStorage.removeItem('_BBB_web_user')
      window.location.href = r.data
    }
  },
  template: `
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img :src="$store.getters.mediaUrl('http://data.vxk.cz/webom/logo-om.svg')">
      </router-link>
      <a role="button" class="navbar-burger" aria-label="menu"
            :class="expanded ? 'is-active' : ''"
            @click="expanded = !expanded">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="expanded ? 'is-active' : ''">
      <div class="navbar-start">

        <router-link 
          v-for="i,idx in $store.state.site.menu" :key="idx" 
          class="navbar-item" :to="i.link"
        >
          {{ i.label }}
        </router-link>

      </div>
    </div>

    <div class="navbar-end" v-if="this.$store.getters.userLogged">
      <div class="navbar-item">
        {{ $store.state.user.CurrentFamilyName }} {{ $store.state.user.CurrentGivenName }}
      </div>
      <div class="navbar-item">
        <button class="button is-danger" @click="logout">
          Odhlásit
        </button>
      </div>
    </div>
    <div v-else class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary" href="https://www.eidentita.cz/Home">
            <strong>Zaregistrovat</strong>
          </a>
          <a class="button is-light" href="https://modurad.otevrenamesta.cz/omstredni/nia/login">
            Příhlásit se
          </a>
        </div>
      </div>
    </div>

  </div>
</nav>
`
}
