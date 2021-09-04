<template>
<q-card-section class="bg-purple-2 text-white">
  <div class="text-h6" style="margin-bottom: 4px"></div>
  <div style="margin-bottom: 8px" v-if="buildGraph.length">
    <Mermaid :nodes="buildGraph" type="graph LR" />
  </div>
    <div class="text-subtitle">
      <q-list bordered separator>
        <q-item  class="bg-purple-1"  clickable v-ripple v-for="iterator in getIterators()" :key="iterator.label">
          <q-item-section @click="setupIterator(iterator)">
            <q-item-label overline>{{ iterator.label.toUpperCase() }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="bg-purple-1" clickable v-ripple>
          <q-item-section @click="prove()">
            <q-item-label overline>PROVE</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
    <q-dialog v-model="dialogOpen" v-if="baseIterator.length" full-width>
      <q-card>
        <q-card-section class="bg-purple-3 text-white">
          <div  align="center" class="text-h6">some title</div>
        </q-card-section>
        <q-card-section class="q-pt-none"  align="center">
          description will go here
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="CANCEL" color="warning" v-close-popup />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="attemptProof">
      <q-card>
        <q-card-section>
          <div v-if="!showSuccess && !showFailure" align="center" >Attempting to prove object at {{ baseAddress }}</div>
          <div v-if="showSuccess" align="center">
            <div style="margin-bottom: 18px">Proofs satisfied.</div>
            <div>
              <q-icon name="check_circle" class="text-lime" style="font-size: 6em;" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div  align="center">
        <q-circular-progress
          indeterminate
          v-if="attemptProof && !(showSuccess || showFailure)"
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
/* eslint-disable no-unused-vars */
import { mapActions, mapState } from 'vuex'
import Mermaid from './Mermaid.vue'

export default {
  name: 'BaseInterface',
  components: {
    Mermaid
  },
  data () {
    return {
      dialogOpen: false,
      attemptProof: false,
      showSuccess: false,
      showFailure: false
    }
  },
  props: ['interfaceAddress'],
  mounted () {
    this.loadObject({ value: this.interfaceAddress, interpretation: '/interface', base: true })
  },
  methods: {
    ...mapActions('objects', ['loadObject', 'proveObject']),
    setupIterator (iterator) {
      this.loadObject({ value: iterator.address, interpretation: '/iterator', base: false })
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
      const {
        baseAddress,
        proveObject
      } = this
      const self = this
      self.attemptProof = true

      proveObject(baseAddress).then((response) => {
        console.log('success')
        self.showSuccess = true
        setTimeout(function () {
          self.attemptProof = false
        }, 1000)

        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState('objects', ['baseObject', 'baseInterface', 'baseIterator', 'interpretations']),
    buildGraph () {
      const connections = []
      const mermaid = this.baseObject.map((obj, index) => {
        const result = {}
        result.id = (index + 1).toString()
        result.text = obj.interpretation.replace('/', '')
        result.style = 'fill:#ebd9eb,stroke:#c687d2,stroke-width:2px'
        connections.push((index + 1).toString())
        return result
      })
      const baseObject = {}
      baseObject.id = 'base'
      baseObject.text = this.baseAddress.substring(0, 8) + '...'
      baseObject.style = 'fill:#ebd9eb,stroke:#c687d2,stroke-width:2px'
      baseObject.next = connections
      mermaid.unshift(baseObject)
      return mermaid
    },
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
