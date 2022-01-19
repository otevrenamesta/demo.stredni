import LikeButton from './parts/likebutton.js'

export default {
  data: function () {
    return {
      loaded: false,
      curr: null,
      projekt: null
    }
  },
  created: async function () {
    try {
      const callid = this.$router.currentRoute.params.call_id
      let currUrl = `${this.$props.data.url}?filter={"id":"${callid}"}`
      const dataReq = await axios.get(currUrl)
      this.$data.curr = dataReq.data.length > 0 ? dataReq.data[0] : null

      const filter = { id: this.$router.currentRoute.params.id }
      const u = `${this.$props.data.url}${callid}?filter=${JSON.stringify(filter)}`
      const projektyReq = await axios.get(u)
      this.$data.projekt = projektyReq.data.length > 0 ? projektyReq.data[0] : null
    } catch (err) {
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  components: { LikeButton },
  template: `
    <div v-if="loaded">
      <h1>{{ projekt.name }}</h1>
      <h2>{{ projekt.desc }}</h2>
      <img :src="projekt.photo" />
      
      <markdown :text="projekt.content" />
      <LikeButton :call="curr" :proj="projekt" :API="this.$props.data.url" />
    </div>
  `
}