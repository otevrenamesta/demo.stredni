const TagSelector = {
  data: function () {
    return {
      selected: null,
      loaded: false
    }
  },
  created: async function () {
    try {
      const req = await axios.get(this.$props.data.url + '/config.json')
      const opts = _.findWhere(req.data.attrs, { name: 'tags' }).options
      this.$data.typeOpts = _.filter(opts, i => i.value !== 'index')
      this.$data.typeOpts.unshift({ text: 'Vše', value: null })
    } catch (_) {
      alert('newsPreview: data.cfgUrl spatne')
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data', 'doSelect'],
  methods: {
    select: function (i) {
      this.$data.selected = i.value
      this.$props.doSelect(i)
    }
  },
  template: `
  <div v-if="loaded" class="tabs is-toggle is-centered">
    <ul>
      <li v-for="i, idx in $data.typeOpts" :key="idx" 
        :class="$data.selected === i.value ? 'is-active' : ''">
        <a href="javascript:void(0);" @click="select(i)">{{ i.text }}</a>
      </li>
    </ul>
  </div>
  `
}

export default {
  data: function () {
    return {
      items: null,
      loaded: false
    }
  },
  created: async function () {
    this.load()
  },
  methods: {
    load: async function (opt) {
      try {
        const filter = (!opt || !opt.value) ? null : {
          tags: { like: "%" + opt.value + "%" }
        }
        const dataReq = await axios.get(this.$props.data.url, { params: {
          sort: 'published:asc',
          currentPage:1,
          perPage: this.$props.data.pocet,
          filter: JSON.stringify(filter)
        }})
        this.$data.items = dataReq.data.data
      } catch (_) {
        this.$data.items = [{ title: 'newsPreview: asi spatne url v datech' }]
      } finally {
        this.$data.loaded = true
      }
    }
  },
  props: ['data'],
  components: { TagSelector },
  template: `
<div :class="data.class">
  
  <h1 class="title is-1">{{ data.title }}</h1>

  <TagSelector :data="data" :doSelect="load" />

  <div v-if="loaded" class="columns is-multiline">
    <div v-for="i,idx in items" :key="idx" class="column is-one-third">

      <router-link :to="data.detail_link + '/' + i.id">

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
                <router-link
                  v-for="j in i.tags.split(',')" :key="j" class="tag"
                  :to="data.detail_link + '?tag=' + j"
                >
                  #{{ j }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </router-link>
  </div>

  <router-link :to="data.detail_link">
    <button class="button is-primary is-fullwidth">
      {{ data.detail_title || 'detaily' }} >> 
    </button>
  </router-link>

</div>
  `
}
