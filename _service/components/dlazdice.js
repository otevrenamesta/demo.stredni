export default {
  props: ['data'],
  methods: {
    style: function (i) {
      return { 'background-image' : `url(${i.background})` }
    }
  },
  template: `
<div class="tile is-ancestor dlazdice" :class="data.class">
  <div v-for="i,idx in data.items" :key="idx" class="tile is-parent">
    <router-link :to="i.link"      
      class="tile is-child box notification"
      :class="'is-' + i.color"
    >
      <div class="content">
        <h3 class="title is-4">{{ i.title }}</h3>
        <markdown :text="i.content" />
      </div>
    </router-link>
  </div>
</div>
  `
}