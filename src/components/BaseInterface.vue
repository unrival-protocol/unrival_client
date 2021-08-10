<template>
  <q-card-section class="bg-secondary text-white">
    <div class="text-h7">Actions</div>
    <div class="text-subtitle2">
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="action in actionPaths" :key="action">
          <q-item-section @click="goTo(action)">
            <q-item-label overline>{{ action.toUpperCase() }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-card-section>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Outcome',
  data () {
    return {
      actionPaths: ['prove', 'create']
    }
  },
  methods: {
    goTo (action) {
      this.$router.push(action)
    }
  },
  computed: {
    ...mapState('objects', ['baseObject'])
  }
}
</script>
