
export default {
  data: function () {
    return {
      items: null,
      loaded: false
    }
  },
  created: async function () {
    try {
      const count = this.$props.data.pocet
      let url = `${this.$props.data.url}?sort=published:asc`
      if (count) url = `${url}&currentPage=1&perPage=${count}`
      const dataReq = await axios.get(url)
      this.$data.items = count ? dataReq.data.data : dataReq.data
    } catch (_) {
      this.$data.items = [{ title: 'newsPreview: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  methods: {
    style: function (i) {
      const url = 'https://www.litomysl.cz/php/obrazky/nahled/1625225320784_.jpg'
      return { 'background-image' : `url(${url})` }
    }
  },
  props: ['data'],
  methods: {
    tagArray: function (i) {
      return 
    }
  },
  template: `
<div :class="data.class">
  
  <h1 class="title is-1">{{ data.title }}</h1>

  <div v-if="loaded" class="columns is-multiline">
    <div v-for="i,idx in items" :key="idx" class="column is-one-third">

      <router-link :to="'/posts/' + i.id">

        <div class="card">
          
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="$store.getters.mediaUrl(i.obrazek, 'w=640')" 
                alt="i.title">
            </figure>
          </div>

          <div class="card-content">        
            <div class="content">
              <h1 class="title is-4">{{ i.title }}</h1>
              <h2 class="subtitle is-7">
                <time datetime="2016-1-1">{{ i.published | longDate }}</time>
              </h2>
              <markdown :text="i.perex" />

              <div class="tags my-3">
                <router-link to="/" v-for="i in i.tags.split(',')" :key="i" class="tag">
                  #{{ i }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </router-link>
  </div>

  <router-link v-if="data.detail_link" :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
  `
}
