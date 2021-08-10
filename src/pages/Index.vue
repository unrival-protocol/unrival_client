<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Unrival</h1>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { mapMutations, mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapState('objects', ['namespaces']),
    params () {
      return this.$route.params.catchAll
    }
  },
  mounted () {
    const {
      loadUniverse,
      parseUrl
    } = this
    loadUniverse()
      .then(function () {
        parseUrl()
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    ...mapActions('objects', ['loadUniverse', 'isUnrivalObject']),
    ...mapMutations('objects', ['setNamespace', 'setAddress']),
    inUniverse (ns) {
      console.log(typeof this.namespaces)
      return ns in Object.keys(this.namespaces)
    },
    async parseUrl () {
      const {
        setAddress,
        setNamespace,
        params,
        inUniverse,
        isUnrivalObject
      } = this
      console.log(params)
      const paramsStart = params.split('/').slice(0)
      const namespace = []
      // figure out which component to load

      // 1. get the parameters

      // 2. starting at leftmost:
      const head = paramsStart[0]

      while (paramsStart.length) {
        // should the current head be added to the namespace?
        const prospectiveNamespace = namespace.join('/') + head
        console.log('the prospective namespace is: ' + prospectiveNamespace)
        if (inUniverse(prospectiveNamespace)) {
          console.log('the propspective univere was found in the namespaces.  see:')
          namespace.push(paramsStart.shift())
          console.log('will set the namespace to: ')
          console.log(namespace)
        } else {
          const isObject = await isUnrivalObject(paramsStart)
          console.log(paramsStart)
          if (paramsStart.length > 1) {
            // if there are 2 + levels remaining, this can't be a valid object
            console.error('something went wrong! the namespace is too long to be valid.')
            return
          } else if (isObject) {
            setNamespace(namespace)
            setAddress(paramsStart.shift())
          } else {
            console.error('object does not exist')
          }
        }
      }
      // is this a
      // 3.
    }
  }
})
</script>
