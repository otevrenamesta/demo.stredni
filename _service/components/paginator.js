
export default {
  // created: async function () {
  //   try {
  //     const dataReq = await axios.get(this.$props.data.url)
  //     this.$data.items = dataReq.data
  //   } catch (_) {
  //     this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
  //   }
  // },
  props: ['data'],
  template: `
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous"> << Předchozí</a>
  <a class="pagination-next">Další >> </a>
  <ul class="pagination-list">
    <li>
      <a class="pagination-link" aria-label="Goto page 1">1</a>
    </li>
    <li>
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 45">45</a>
    </li>
    <li>
      <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 47">47</a>
    </li>
    <li>
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 86">86</a>
    </li>
  </ul>
</nav>
  `
}
