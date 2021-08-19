const formComponents = {
  finput: {
    props: [ 'data', 'cfg' ],
    template: `
    <input class="input" :type="cfg.type" 
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  },
  ftextarea: {
    props: [ 'data', 'cfg' ],
    template: `
    <textarea class="textarea" :rows="cfg.rows"
      :value="data[cfg.name]"
      @input="evt => data[cfg.name] = evt.target.value" />
    `
  }
}
const validators = {
  required: (val) => {
    return val && val.length > 0 ? null : 'pole je povinné'
  },
  maxLen: (num) => (val) => {
    return val.length > num ? 'pole je moc dlouhé' : null
  }
}

export default {
  data: function () {
    return {
      submitting: false,
      errors: [],
      formdata: []
    }
  },
  created: function () {
    this.$data.formcontrol = jsyaml.load(this.$props.cfg.form)
    this.$data.formdata = _.reduce(this.$data.formcontrol, (acc, i) => {
      acc[i.name] = this.$props.data ? this.$props.data[i.name] : ''
      return acc
    }, {})
    this.$data.errors = _.reduce(this.$data.formcontrol, (acc, i) => {
      acc[i.name] = null
      return acc
    }, {})
  },
  methods: {
    handleSubmit: async function () {
      const invalid = this.validate()
      if (invalid) return
      this.$data.submitting = true
      try {
        const res = await axios.post(this.$props.cfg.url, data)
      } catch (err) {
        this.$store.dispatch('toast', { message, type: 'error' })
      } finally {
        this.$data.submitting = false
      }      
    },
    validate: function () {
      _.map(this.$data.formcontrol, i => {
        if (!i.rules) return
        const err = validators[i.rules](this.$data.formdata[i.name])
        this.$data.errors[i.name] = err
      })
      return _.some(this.$data.errors, (v, k) => (v !== null))
    },
    getError: function (name) {
      return this.$data.errors[name]
    }
  },
  props: ['cfg', 'data'],
  components: formComponents,
  template: `
<form>

  <div class="columns is-flex-wrap-wrap">
    <div class="column" :class="i.class" v-for="i, idx in $data.formcontrol" :key="idx">

      <div class="field">
        <label class="label">{{ i.label }}</label>
        
        <div class="control has-icons-right">
          <component :is="i.component" 
            :class="getError(i.name) ? 'is-danger' : 'is-success'"
            :data="$data.formdata" :cfg="i"
            :placeholder="i.placeholder" />
          <span class="icon is-small is-right">
            <i class="fas" :class="getError(i.name) ? 'fa-exclamation-triangle' : 'fa-check'"></i>
          </span>
        </div>
        
        <p v-if="getError(i.name)" class="help is-danger">{{ getError(i.name) }}</p>

      </div>

    </div>
  </div>

  <div class="field has-addons">
    <p class="control">
      <button class="button is-success" :disabled="submitting">
        <span class="icon is-small"><i class="fas fa-bold"></i></span>
        <span>Odeslat</span>
      </button>
    </p>
    <p class="control">
      <button class="button is-danger" :disabled="submitting">
        <span class="icon is-small"><i class="fas fa-italic"></i></span>
        <span>Stáhnout</span>
      </button>
    </p>
    <p class="control">
      <button class="button is-warning" :disabled="submitting">
        <span class="icon is-small">
          <i class="fas fa-underline"></i>
        </span>
        <span>Poslat datovkou</span>
      </button>
    </p>
  </div>

<form>
  `
}
