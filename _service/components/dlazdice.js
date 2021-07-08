export default {
  props: ['data'],
  methods: {
    style: function (i) {
      return { 'background-image' : `url(${i.background})` }
    }
  },
  template: `
<div class="columns dlazdice" :class="data.class">

  <router-link class="column"
    v-for="i,idx in data.items" :key="idx" 
    :to="i.link"
    :style="style(i)">

    <h1>{{ i.title }}</h1>
    <markdown :text="i.content" />
  </router-link>

</div>
  `
}