export default {
  props: ['data'],
  template: `
<router-link :to="data.link">
  <button class="button" :class="data.class">
    {{ data.title || 'detaily' }} >> 
  </button>
</router-link>
  `
}