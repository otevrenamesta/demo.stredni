export default {
  data: () => {
    return {
      support: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      if (this.$store.state.user) {
        const res = await axios.get(`${this.API}/support/${projId}`)
        this.$data.support = res && res.data.length > 0
      }
    },
    sendSupport: async function () {
      const projId = this.$router.currentRoute.params.id
      if (this.$data.support) {
        await axios.delete(`${this.API}/support/${projId}`)
        this.$data.support = false
      } else {
        const res = await axios.post(`${API}/paro/support/${projId}`)
        this.$data.support = true
        this.$props.project.state = res.data
      }
    }
  },
  computed: {
    canSupport: function () {
      return this.call.status === 'open' && this.proj.state === 'new'
    },
    supportbutt: function () {
      return this.$data.support ? 'Už se mi to nelíbí' : 'Líbí se mi'
    }
  },
  props: ['call', 'proj', 'API'],
  template: `
    <div v-if="canSupport">
      <button class="button" :disabled="!$store.state.user" @click="sendSupport">
        {{supportbutt}}
      </button>
      <span v-if="!$store.state.user">
        Pro udílení "Líbí se mi" se přihlašte
      </span>
    </div>
  `
}
