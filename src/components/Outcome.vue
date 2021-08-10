<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Outcome</div>
      <div v-if="baseObject.length" class="text-subtitle2">{{ baseObject.find(x => x.name === 'description').value }}</div>
    </q-card-section>
    <base-interface />
   </q-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BaseInterface from './BaseInterface'

export default {
  name: 'Outcome',
  data () {
    return {
      outcome: [],
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
