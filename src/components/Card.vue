<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
        {{ someobject }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const $store = useStore()

    const someobject = computed({
      get: () => $store.state.objects.testobject,
      set: val => {
        $store.commit('objects/someMutation', val)
      }
    })

    return {
      someobject
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
