<template>
  <div>
    {{ testobject }}
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
  name: 'Representation',
  methods: {
    ...mapActions('objects', ['loadObject'])
  },
  computed: {
    ...mapState('objects', ['testobject'])
  },
  mounted () {
    const address = window.location.href.split('/')[window.location.href.split('/').length - 1]
    this.loadObject('representation/' + address)
  }
})
</script>
