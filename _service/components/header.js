
export default {
  data: function () {
    return { expanded: false }
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

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary" href="https://www.eidentita.cz/Home">
            <strong>Zaregistrovat</strong>
          </a>
          <a class="button is-light" href="https://www.eidentita.cz/Home">
            Příhlásit se
          </a>
        </div>
      </div>
    </div>

  </div>
</nav>
`
}
