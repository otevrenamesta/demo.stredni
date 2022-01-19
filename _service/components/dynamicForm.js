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
  computed: {
    hasErrors: function () {
      this.errors.length > 0
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
        const res = await this.$props.submit(_.clone(this.formdata))
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
    },
    getComponent: function (name) {
      if (this.extracomponents && name in this.extracomponents) {
        return this.extracomponents[name]
      }
      return name
    }
  },
  props: ['cfg', 'data', 'submit', 'extracomponents'],
  components: formComponents,
  template: `
<form @submit.prevent>

  <div class="columns is-flex-wrap-wrap">
    <div class="column" :class="i.class" v-for="i, idx in $data.formcontrol" :key="idx">

      <div class="field">
        <label class="label">{{ i.label }}</label>
        
        <div class="control has-icons-right">
          <component :is="getComponent(i.component)" 
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

  <slot name="submitbuttons" :hasErrors="hasErrors" :submitting="submitting">  
    <button class="button is-success" :disabled="submitting || hasErrors" @click="handleSubmit">
      <span class="icon is-small"><i class="fas fa-bold"></i></span>
      <span>uložit</span>
    </button>
  </slot>

</form>
  `
}
