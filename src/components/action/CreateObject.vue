<template>
    <q-card style="width: 300px" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">create {{ namespace }}</div>
      </q-card-section>
      <q-card-section>
        <div><q-input v-model="payload.title" placeholder="title"></q-input></div>
      </q-card-section>
      <q-card-section>
        <span><q-btn @click="cancel" color="warning">CANCEL</q-btn></span>
        <span><q-btn @click="create" color="primary">CREATE</q-btn></span>
      </q-card-section>
    </q-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'create-object',
  data () {
    return {
      showDialog: true,
      payload: {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('objects', ['baseObject']),
    description () {
      return 'hi'
      // return this.baseObject.find(row => row.name === 'description')
    },
    address () {
      const params = this.$route.params.catchAll
      if (params.length) {
        return params.pop()
      }
      return ''
    },

    namespace () {
      const params = this.$route.params.catchAll
      console.log('the catchall:')
      console.log(params)
      if (params.length) {
        params.pop()
        return params.join('/')
      }
      return ''
    }
  },
  methods: {
    ...mapActions('objects', ['createObject']),
    create () {
      const parts = [
        {
          type: 'string',
          name: 'title',
          value: this.payload.title
        },
        {
          type: 'string',
          name: 'description',
          value: this.payload.description
        }
      ]
      this.createObject({ payload: parts, namespace: this.namespace })
    },
    cancel () {
      this.$router.push({ path: this.namespace })
    }
  }
}
</script>
