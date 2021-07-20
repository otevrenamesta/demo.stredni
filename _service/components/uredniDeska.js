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
      this.$data.posts = [{ title: 'newsPreview: asi spatne url v datech' }]
    } finally {
      this.$data.loaded = true
    }
  },
  props: ['data'],
  template: `
<div :class="data.class">

  <table class="table">
    <thead>
      <tr>
        <th>Předmět</th>
        <th>Zveřejněno Od</th>
        <th>Zveřejněno Do</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Předmět</th>
        <th>Zveřejněno Od</th>
        <th>Zveřejněno Do</th>
      </tr>
    </tfoot>
    <tbody>
      <tr v-for="i, idx in items" :key="idx">
        <td>{{ i.title }} <a :href="i.attachments" target="_blank">
          <i class="fas fa-file-pdf"></i>
          </a>
        </td>
        <td>{{ i.published | date }}</td>
        <td>{{ i.unpublished | date }}</td>
      </tr>
    </tbody>

  </table>

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

</div>
  `
}