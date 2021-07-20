export default {
  template: `
  <footer class="footer">
    <div class="container">
      <div class="columns is-desktop">
      
        <img class="column is-2 logo" src="http://data.vxk.cz/webom/logo-om.svg" />

        <div class="column is-3">
          Otevřená města, z. s. <br />
          Malinovského náměstí 624/3<br />
          602 00 Brno
        </div>

        <div class="column is-4 socials">
          <a :href="$store.state.site.github" target="_blank"><i class="fab fa-github"></i></a>
          <a :href="$store.state.site.facebook" target="_blank"><i class="fab fa-facebook"></i></a>
          <a :href="$store.state.site.gitlab" target="_blank"><i class="fab fa-gitlab"></i></a>
        </div>

      </div>
    </div>
  </footer>
`}
