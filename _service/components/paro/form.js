import DynamicForm from '../dynamicForm.js'
import formcontrol from './formcontrol.js'

export default {
  data: function () {
    return {
      curr: null
    }
  },
  created: async function () {
    try {
      const url = `https://modurad.otevrenamesta.cz/omstredni/uni/forms/?filter={"id":${id}}`
      const dataReq = await axios.get(url)
      this.$data.item = dataReq.data[0]
    } catch (_) {
      alert('ee')
    } finally {
      this.$data.loading = false
    }
  },
  computed: {
    formcfg: function () {
      return { form: formcontrol }
    }
  },
  props: ['data'],
  components: { DynamicForm },
  template: `
    <div class="column">
      <DynamicForm :cfg="formcfg" :data="curr" />
    </div>
  `
}