import DynamicForm from '../../dynamicForm.js'
import formcontrol from './budget_formcontrol.js'

export function countTotal (items) {
  return items.reduce((acc, i) => {
    return acc + (i.count * i.price)
  }, 0)
}

export default {
  data: function () {
    return {
      item: null,
      curr: null
    }
  },
  methods: {
    remove: function (item) {
      const items = this.data[this.cfg.name]
      const idx = _.findIndex(items, i => (i.name === item.name))
      items.splice(idx, 1)
      // this.$emit('input', JSON.stringify(items))
    },
    add: function () {
      this.$data.curr = null
      this.$data.item = { count: 1, name: '', price: '', link: '' }
    },
    edit: function (idx, item) {
      this.$data.curr = idx
      this.$data.item = item
      // Object.assign(this.$data.item, item)
    },
    onItemSubmit: function (item) {
      const items = this.data[this.cfg.name]
      this.$data.curr === null
        ? items.push(item)
        : Object.assign(items[this.$data.curr], item)
      this.$data.item = null
      // this.$props['v-model'] = newVal
      // this.$emit('input', newVal)
    }
  },
  computed: {
    total: function () {
      return countTotal(this.data[this.cfg.name])
    },
    formcfg: function () {
      return { form: formcontrol }
    }
  },
  props: [ 'data', 'cfg' ], //'v-model'],
  components: { DynamicForm },
  template: `
    <div>
      <table class="table" style="width:100%;">
        <thead>
          <tr>
            <th scope="col">Název</th>
            <th scope="col">Počet</th>
            <th scope="col">Cena</th>
            <th><button class="button is-primary" @click="add">+ přidat položku</button></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, idx) in data[cfg.name]">
            <td>{{ i.name }} <a v-if="i.link" v-bind:href="i.link" target="_blank">(odkaz)</a></td>
            <td>{{ i.count }}</td>
            <td>{{ i.price }}</td>
            <td>
              <button class="button is-secondary" @click='edit(idx, i)'>edit</button>
              <button class="button is-danger" @click='remove(i)'>x odstranit</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="modal" :class="item!==null ? 'is-active' : ''">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <DynamicForm :cfg="formcfg" :data="item" :submit="onItemSubmit" />
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="item=null"></button>
      </div>

      <h3>Celkové náklady s DPH: {{ total }}.</h3>
      
    </div>
  `
}