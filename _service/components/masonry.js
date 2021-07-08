export default {
  data: () => ({
    show: false
  }),
  props: ['data', 'path'],
  methods: {
    showCarousel: function (idx) {
      this.$vfm.show('example', { userName: 'vue-final-modal' })
    }
  },
  // mounted () {
  //   import('https://cdn.jsdelivr.net/npm/vue-js-modal@2.0.0-rc.6/dist/index.js')
  //   .then(res => {
  //     console.log(res);
  //   })
  // },
  components: {
    modal: () => import('https://cdn.jsdelivr.net/npm/vue-final-modal')
  },
  template: `
  <div :class="data.class">
    <div class="card-columns masonry">
      <div class="card" v-for="(i, idx) in data.list" :key="idx">
        <img :src="$store.state.site.cdn + i.url" :alt="i.name"
          @click="showCarousel(idx)" />
      </div>
      <vue-final-modal v-model="show" name="example">
        <template v-slot="{ params }">
          <div class="container bg-light">
            <div class="row">
              <div class="col-12">
                Hi {{ params.userName }}
              </div>
            </div>
          </div>
        </template>
      </vue-final-modal>
    </div>
  </div>
  `
}
