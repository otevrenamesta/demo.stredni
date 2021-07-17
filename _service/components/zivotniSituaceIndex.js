const items = [
  { title: 'Doprava', link: '' },
  { title: 'Majetek', link: '' },
  { title: 'Občan', link: '' }
]

export default {
  computed: {
    items: function () {
      return items
    }
  },
  props: ['data'],
  template: `
<div class="zivotnisituace section content" :class="data.class">
  <h2 class="title is-2">{{ data.title }}</h2>
  <ul>
    <router-link v-for="i, idx in items" :key="idx" :to="i.link">
      <li>{{ i.title }}</li>
    </router-link>
  </ul>

  <router-link v-if="data.detail_link" :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
`
}