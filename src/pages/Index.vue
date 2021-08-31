<template>
  <q-page class="flex flex-center">
    <div>
      <h1>Unrival</h1>
      {{ interpretations }}
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

import { mapMutations, mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'PageIndex',
  computed: {
    ...mapState('objects', ['interpretations']),
    params () {
      return this.$route.params.catchAll
    }
  },
  mounted () {
    const {
      loadContext
      // parseUrl
    } = this
    loadContext()
    .then(function () {
       parseUrl()
    })
    .catch((err) => {
      console.error(err)
     })
  },
  methods: {
    ...mapActions('objects', ['loadContext', 'isUnrivalObject']),
    ...mapMutations('objects', ['setInterpretation', 'setAddress']),
    inContext (interpretation) {
      console.log(typeof this.interpretations)
      return ns in Object.keys(this.interpretations)
    },
    async parseUrl () {
      const {
        setAddress,
        setInterpretation,
        params,
        inContext,
        isUnrivalObject
      } = this
      console.log(params)
      const paramsStart = params.split('/').slice(0)
      const interpretation = []
      // figure out which component to load

      // 1. get the parameters

      // 2. starting at leftmost:
      const head = paramsStart[0]

      while (paramsStart.length) {
        // should the current head be added to the interpretation?
        const prospectiveInterpretation = interpretation.join('/') + head
        console.log('the prospective interpretation is: ' + prospectiveInterpretation)
        if (inContext(prospectiveInterpretation)) {
          console.log('the propspective univere was found in the interpretations.  see:')
          interpretation.push(paramsStart.shift())
          console.log('will set the interpretation to: ')
          console.log(interpretation)
        } else {
          const isObject = await isUnrivalObject(paramsStart)
          console.log(paramsStart)
          if (paramsStart.length > 1) {
            // if there are 2 + levels remaining, this can't be a valid object
            console.error('something went wrong! the interpretation is too long to be valid.')
            return
          } else if (isObject) {
            setInterpretation(interpretation)
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
