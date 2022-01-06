export default {
  props: ['proj'],
  template: `
    <div v-if="proj" class="column">
      <img :src="proj.icon" />
      <h3>{{ proj.title }}</h3>
      <p>{{ proj.desc }}</p>
    </div>
  `
}