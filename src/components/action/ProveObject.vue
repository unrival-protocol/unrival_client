<template>
    <q-card style="width: 300px" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">Prove {{ namespace }}</div>
      </q-card-section>
      <q-card-section class="result">
        <div v-if="baseProofSucceeded">Proof Succeeded</div>
        <div v-else>Proof Failed</div>
        {{ routerParams }}
      </q-card-section>
    </q-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'prove-object',
  data () {
    return {
      showDialog: true,
      succeeded: false
    }
  },
  methods: {
    ...mapActions('objects', ['proveObject'])
  },
  computed: {
    ...mapState('objects', ['baseObject', 'baseProofSucceeded']),
    routerParams () {
      return this.$route.params
    },
    description () {
      return 'hi'
      // return this.baseObject.find(row => row.name === 'description')
    },
    namespace () {
      console.log(this.$route.params)
      const params = this.$route.params.catchAll
      console.log(params)
      if (params.length) {
        params.pop()
        console.log('will import' + params)
        return params.join('/')
      }
      return ''
    },
    address () {
      const params = this.$route.params.catchAll
      if (params.length) {
        return params.pop()
      }
      return ''
    }
  },
  created () {
    this.proveObject({ address: this.address, namespace: this.namespace })
  }
}
</script>
