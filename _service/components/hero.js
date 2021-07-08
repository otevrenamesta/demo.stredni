export default {
  props: ['data'],
  template: `
<div class="hero" :class="data.class">

  <div class="hero-body">
    <p class="title">{{ data.title }}</p>
    <p class="subtitle">
      <markdown :text="data.content" />
    </p>
  </div>

</div>
  `
}