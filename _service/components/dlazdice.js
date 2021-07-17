export default {
  props: ['data'],
  // methods: {
  //   style: function (i) {
  //     return { 'background-image' : `url(${i.background})` }
  //   }
  // },
  template: `
<div class="dlazdice" :class="data.class">
  <div class="tile is-ancestor">
    <div v-for="i,idx in data.items" :key="idx" class="tile is-parent">
      <router-link :to="i.link"      
        class="tile is-child box"
        :class="'is-' + i.color"
      >
        <i class="title is-1 fas" :class="i.icon"></i>
        <h3 class="title is-4">{{ i.title }}</h3>
      </router-link>
    </div>
  </div>

  <router-link v-if="data.detail_link" :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
`
}