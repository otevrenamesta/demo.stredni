export default {
  props: ['proj', 'call'],
  computed: {
    url: function () {
      return `/paro/${this.call.id}/${this.proj.id}`
    }
  },
  template: `
    <div class="column">
      <img :src="proj.photo" /><br/>
      <h4><router-link :to="url">{{ proj.name }}</router-link></h4>
      <h5>{{ proj.desc }}</h5>
    </div>
  `
}