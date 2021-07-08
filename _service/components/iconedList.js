export default {
  props: ['data', 'path'],
  template: `
    <div class="columns iconedList">
      <div v-for="i, idx in data.list" class="column">
        <img :src="i.icon" />
        <h3>{{ i.title }}</h3>
        <p>{{ i.desc }}</p>
      </div>
    </div>
  `
}
