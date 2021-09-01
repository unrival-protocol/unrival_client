<template>
<q-card-section class="bg-secondary text-white">
  <div class="text-h7">Actions</div>
    <div class="text-subtitle2">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="action in getActions()" :key="action.label">
          <q-item-section @click="prepareAction(action)">
            <q-item-label overline>{{ action.label.toUpperCase() }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ action.label }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ action.description }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CANCEL" color="warning" v-close-popup />
          <q-btn flat label="CONFIRM" color="primary" @click="performAction" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card-section>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Outcome',
  data () {
    return {
      dialogOpen: false
    }
  },
  props: ['interfaceAddress'],
  mounted () {
    this.loadObject({ value: this.interfaceAddress, interpretation: '/interface' })
  },
  methods: {
    ...mapActions('objects', ['loadObject']),
    goTo (action) {
      this.$router.push(action)
    },
    prepareAction (action) {
      this.loadObject({ value: this.action.address, interpretation: '/action' })
      this.dialogOpen = true
    },
    performAction () {
      console.log(this.baseAction)
    },
    getActions () {
      if (!this.baseInterface.length) return
      return this.baseInterface
        .filter(obj => obj.interpretation === '/action')
    }
  },
  computed: {
    ...mapState('objects', ['baseObject', 'baseInterface', 'baseAction'])
  }
}
</script>
