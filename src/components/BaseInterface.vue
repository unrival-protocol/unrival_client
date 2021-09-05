<template>
<q-card-section class="bg-brand-ternary text-grey-8">
  <div style="display: grid; grid-template-rows: 1fr 1fr 1fr; height: 15vh">
    <div class="text-h6 bg-brand-primary" style="display: grid; padding: 6px; grid-template-rows: 1fr 1fr; font-weight: 400; font-family: roboto; border: 1px solid #6F5B3E">
      <div style="display: grid; grid-template-columns: 2fr 1fr; align-items: center; padding-top: 0px">
        <div style="">{{ baseTitle }}</div>
        <Cred :claims="claims" />
      </div>
      <div class="text-grey-7" style="margin-top: 0px; font-size: 13px">
        {{ baseDescription }}
      </div>
    </div>
  </div>
  <div style="display: flex; align-items: center; justify-content: center" >
    <div style="display: flex; align-items: center; justify-content: center" v-if="mermaidGraph.length">
      <Mermaid v-if="showGraph" :nodes="mermaidGraph" type="graph LR" />
      <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fiestas_Patrias_Parade%2C_South_Park%2C_Seattle%2C_2015_-_358_-_lowriders_(21403531350).jpg/1200px-Fiestas_Patrias_Parade%2C_South_Park%2C_Seattle%2C_2015_-_358_-_lowriders_(21403531350).jpg" style="height: 250px" />
    </div>
  </div>
  <div>
    <div class="text-substepTitle">
      <q-list bordered separator v-if="baseInterface">
        <q-item  align="center" class="bg-brand-primary" clickable v-ripple v-for="iterator in iterators" :key="iterator.label">
          <q-item-section @click="setupIterator(iterator)">
            <q-item-label overline>{{ iterator.label.toUpperCase() }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item align="center" class="bg-brand-primary" clickable v-ripple>
          <q-item-section @click="prove()">
            <q-item-label overline>PROVE</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
    <q-dialog v-model="dialogOpen" v-if="baseIterator.length">
      <q-card>
        <q-card-section class="bg-brand-primary text-grey-8">
          <div  align="center" class="">{{ stepTitle }}</div>
        </q-card-section>
        <q-card-section class="bg-white text-grey-10">
          <div  align="center" class="">{{ stepDescription }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="margin-top: 10px"  align="center">
          <q-card-section v-if="stepForm">
            <div v-for="input in stepForm" :key="input.label">
              <q-input v-if="input.type==='string'" :label="input.label" :model="formInputs[input.label]"></q-input>
            </div>
            <!--
                <component :is="getInputType(input)" v-for="input in stepForm" :key="input.label" :label="input.label" />
            -->
          </q-card-section>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="CANCEL" color="warning" v-close-popup />
          <q-btn flat :label="choice.label" :key="choice.label" v-for="choice in choices" @click="setupIterator(choice)" color="primary"  />
          <div :key="choice.label" v-for="choice in choices" ></div>
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
              <q-icon name="check_circle" class="text-purple-4" style="font-size: 6em;" />
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
import Cred from './Cred.vue'
import { colors } from 'quasar'

const { getPaletteColor } = colors

console.log(getPaletteColor('bg-brand-secondary')) // '#1976d2'

export default {
  name: 'BaseInterface',
  components: {
    Mermaid,
    Cred
  },
  data () {
    return {
      dialogOpen: false,
      showGraph: true,
      attemptProof: false,
      showSuccess: false,
      showFailure: false,
      formInputs: {}
    }
  },
  props: ['interfaceAddress'],
  mounted () {
    this.loadObject({ value: this.interfaceAddress, interpretation: '/interface', base: true })
  },
  methods: {
    getInputType (input) {
      return 'q-' + input.element
    },
    stepInputs (data) {
      if (!data && !data.length) return
      console.log(JSON.parse(JSON.stringify(data)))
      const match = JSON.parse(JSON.stringify(data)).find(obj => obj.inputs)
      if (match) {
        return match.inputs
      }
      return null
    },
    ...mapActions('objects', ['loadObject', 'proveObject']),
    setupIterator (iterator) {
      const {
        formInputs,
        loadObject,
        baseIterator,
        stepInputs,
        $set
      } = this
      const self = this
      loadObject({ value: iterator.address, interpretation: '/iterator', base: false }).then((data) => {
        const inputs = stepInputs(data)
      })
      this.dialogOpen = true
    },
    sendData (data) {
      console.log(this.formInputs)
    },
    getChoices (iterator) {
      console.log(iterator)
      console.log(this.baseIterator)
      const target = JSON.parse(JSON.stringify(this.baseIterator))
      console.log('the target')
      console.log(target)
      return target.filter(choice => choice.interpretation.startsWith('/iterator'))
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
    iterators () {
      const val = JSON.parse(JSON.stringify(this.baseInterface))
      if (!(val && val.length)) return []
      console.log('getting iterators')
      console.log(val)
      return val.filter(obj => obj.interpretation && obj.interpretation.startsWith('/iterator'))
    },
    claims () {
      const val = JSON.parse(JSON.stringify(this.baseObject))
      if (!(val && val.length)) return []
      return val.filter(obj => obj.interpretation === '/iterator/claim')
    },
    mermaidGraph () {
      console.log(window.location)
      const connections = []
      const mermaid = this.baseObject.filter(obj => obj.interpretation).map((obj, index) => {
        const result = {}
        result.id = (index + 1).toString()
        result.text = obj.interpretation.replace('/', '')
        result.style = 'fill:#F9F6F0,stroke-width:1px,stroke: #6F5B3E'
        connections.push((index + 1).toString())
        return result
      })
      const baseObject = {}
      baseObject.id = 'base'
      baseObject.text = this.baseAddress.substring(0, 8) + '...'
      baseObject.style = 'fill:#F9F6F0,stroke: #6F5B3E,stroke-width:1px'
      baseObject.next = connections
      mermaid.unshift(baseObject)
      return mermaid
    },
    baseTitle () {
      const match = this.baseObject.find(obj => obj.title)
      if (match) {
        return match.title
      }
      return 'Untitled'
    },
    baseDescription () {
      const match = this.baseObject.find(obj => obj.description)
      if (match) {
        return match.description
      }
      return 'Untitled'
    },
    stepTitle () {
      const match = this.baseIterator.find(obj => obj.title)
      if (match) {
        return match.title
      }
      return 'Untitled'
    },
    stepDescription () {
      const match = this.baseIterator.find(obj => obj.description)
      if (match) {
        return match.description
      }
      return 'No description found'
    },
    stepForm () {
      if (!this.baseIterator && !this.baseIterator.length) return
      const data = this.baseIterator
      console.log(JSON.parse(JSON.stringify(data)))
      const match = JSON.parse(JSON.stringify(data)).find(obj => obj.inputs)
      if (match) {
        return match.inputs
      }
      return null
    },
    choices () {
      if (!this.baseIterator.length) return
      console.log(JSON.parse(JSON.stringify(this.baseIterator)))
      return JSON.parse(JSON.stringify(this.baseIterator)).filter((choice) => {
        if (!choice.interpretation) return false
        return choice.interpretation.startsWith('/iterator')
      })
    },
    baseAddress () {
      if (!Object.keys(this.interpretations).length) return false
      return this.interpretations['/' + this.$route.params.catchAll]
    }
  }
}
</script>
<style>

</style>
