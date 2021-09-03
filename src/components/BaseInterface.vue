<template>
<q-card-section class="bg-secondary text-white">
  <div class="text-h6" style="margin-bottom: 4px">the title goes here</div>
  <div style="margin-bottom: 8px">
    <div></div>
  </div>
    <div class="text-subtitle">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="iterator in getIterators()" :key="iterator.label">
          <q-item-section @click="setupIterator(iterator)">
            <q-item-label overline>{{ iterator.label.toUpperCase() }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section @click="prove()">
            <q-item-label overline>PROVE</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
    <q-dialog v-model="dialogOpen" v-if="baseIterator.length" full-width>
      <q-card>
        <q-card-section>
          <div  align="center" class="text-h6">some title</div>
        </q-card-section>
        <q-card-section class="q-pt-none"  align="center">
          description will go here
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="CANCEL" color="warning" v-close-popup />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="attemptProof">
      <q-card>
        <q-card-section>
          <div  align="center" >Attempting to prove object at {{ baseAddress }}</div>
        </q-card-section>
        <q-card-section>
          <div  align="center">
        <q-circular-progress
          indeterminate
          v-if="attemptProof"
          size="50px"
          color="lime"
          class="q-ma-md"
          />

          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card-section>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BaseInterface',
  data () {
    return {
      dialogOpen: false,
      attemptProof: false
    }
  },
  props: ['interfaceAddress'],
  mounted () {
    this.loadObject({ value: this.interfaceAddress, interpretation: '/interface' })
  },
  methods: {
    ...mapActions('objects', ['loadObject', 'proveObject']),
    setupIterator (iterator) {
      this.loadObject({ value: iterator.address, interpretation: '/iterator' })
      this.dialogOpen = true
    },
    getChoices (iterator) {
      console.log(iterator)
      console.log(this.baseIterator)
      const target = JSON.parse(JSON.stringify(this.baseIterator))
      console.log('the target')
      console.log(target)
      return target.filter(choice => choice.interpretation.startsWith('/iterator'))
    },
    getIterators () {
      if (!this.baseInterface.length) return
      return this.baseInterface.filter(obj => obj.interpretation.startsWith('/iterator'))
    },
    prove () {
      this.attemptProof = true
      console.log(this.$route.params.catchAll)

      this.proveObject(this.baseAddress).then((response) => {
        console.log('success')
        this.attemptProof = false
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState('objects', ['baseObject', 'baseInterface', 'baseIterator', 'interpretations']),
    choices () {
      if (!this.baseIterator.length) return
      console.log(JSON.parse(JSON.stringify(this.baseIterator)))
      return JSON.parse(JSON.stringify(this.baseIterator)).filter(choice => choice.interpretation.startsWith('/iterator'))
    },
    baseAddress () {
      if (!Object.keys(this.interpretations).length) return false
      return this.interpretations['/' + this.$route.params.catchAll]
    }
  }
}
</script>
