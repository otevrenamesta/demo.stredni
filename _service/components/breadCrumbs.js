export default {
  props: ['data'],
  template: `
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><router-link to="/"><i class="fas fa-home"></i></router-link></li>
    <li v-for="i in data" :key="i.link">
      <router-link :to="i.link">{{ i.title }}</router-link>
    </li>
  </ul>
</nav>
  `
}