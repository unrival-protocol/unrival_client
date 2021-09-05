<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-brand-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          class="text-brand-secondary"
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-grey-7">
          UNRIVAL
        </q-toolbar-title>

        <div>
        <q-btn
          flat
          dense
          round
          class="text-brand-secondary"
          icon="settings"
          aria-label="Menu"
          @click="toggleRightDrawer"
        />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      side="right"
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Settings
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'Unrival documentation',
    icon: 'school',
    link: 'https://competent-sinoussi-0a4006.netlify.app/'
  },
  {
    title: 'Github',
    caption: 'Unrival codebase',
    icon: 'code',
    link: 'https://github.com/unrival-protocol/'
  },
  {
    title: 'Web',
    caption: 'Unrival homepage',
    icon: 'home',
    link: 'https://gifted-hawking-48a79a.netlify.app/'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>
