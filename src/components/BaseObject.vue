<template>
<div>
  <!--    <component :is="componentFile" /> -->
    <base-interface v-if="baseObject.length && getInterface()" :interface-address="getInterface().address" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { defineComponent, defineAsyncComponent } from 'vue'
import BaseInterface from './BaseInterface'

export default defineComponent({
  name: 'BaseObject',
  components: {
    BaseInterface
  },
  methods: {
    ...mapActions('objects', ['loadObject']),
    // importComponent (path) {
    //  console.log(`./${path}.vue`)
    //  this.loadObject(this.namespace, this.address)
    //  return () => import(`./${path}.vue`)
    // },
    // async getComponentFile () {
    //  const component = await this.importComponent(this.namespace)
    //  return component
    // },
    getInterface () {
      return this.baseObject.find(row => row.interpretation === '/interface') || null
    }
  },
  computed: {
    ...mapState('objects', ['baseObject']),
    componentFile () {
      return defineAsyncComponent(() => import(`./${this.namespace}.vue`))
    },
    namespace () {
      // console.log(this.$route.params.catchAll)
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
  }
})
</script>
