<template>
  <div>hi</div>
  <base-interface />
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BaseInterface from './BaseInterface'

export default {
  name: 'Agent',
  data () {
    return {
      agent: [],
      componentPath: '',
      address: ''
    }
  },
  components: {
    BaseInterface
  },
  created () {
    console.log(this.baseNamespace + ' is the base namespace')
    this.loadObject({ namespace: this.baseNamespace, address: this.baseAddress })
  },
  methods: {
    ...mapActions('objects', ['loadObject'])
  },
  mounted () {

  },
  computed: {
    ...mapState('objects', ['baseObject', 'baseAddress', 'baseNamespace']),
    description () {
      return 'hi'
      // return this.baseObject.find(row => row.name === 'description')
    }
  }
}
</script>
