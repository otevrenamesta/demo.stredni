import ProjectForm from './paro/form.js'
import ProjectDetail from './paro/projectdetail.js'

export default {
  data: function () {
    return {
      loaded: false,
      archive: [],
      curr: null,
      projekty: [],
      modalopened: false
    }
  },
  created: async function () {
    try {
      const filter = { not: { status: 'closed' } }
      let currUrl = `${this.$props.data.url}?filter=${JSON.stringify(filter)}`
      const dataReq = await axios.get(currUrl)
      this.$data.curr = dataReq.data[0]
      const projektyReq = await axios.get(`${this.$props.data.url}/${this.$data.curr.id}`)
      this.$data.projekty = projektyReq.data
    } catch (err) {
      alert(err)
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  methods: {
    edit: function () {
      this.modalopened = true
    },
    cancel: function () {
      this.modalopened = false
    }
  },
  components: { ProjectDetail, ProjectForm },
  template: `
  <div v-if="loaded">
    <div v-if="curr">
      <button class="button is-primary is-pulled-right" @click="edit">
        podat/upravit projekt
      </button>
      <h2 class="title">{{ curr.name }}</h2>
      <p>
        Začátek podávání návrhů: {{ curr.submission_start | date }}
      </p>
      <hr />
      <div class="columns">
        <ProjectDetail v-for="i,idx in projekty" :key="idx" :proj="i" />
      </div>
    </div>
    <span v-else>Není žádná aktuální výzva</span>
    <div class="modal" :class="{'is-active': modalopened}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <ProjectForm :data="data" />
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cancel" />
    </div>
  </div>
  `
}

// `<h4>archiv</h4>
// <ul class="menu-list" v-if="loaded">
//   <li v-for="i,idx in items" :key="idx">
//     <router-link :to="data.detail_link + '/' + i.id">
//       <h3 class="title is-4">{{ i.name }}</h3>
//     </router-link>
//   </li>
// </ul>`