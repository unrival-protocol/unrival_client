<template>
  <div id="cred" class="cred" style="display: grid; grid-template-columns: 8fr 1fr 1fr 1fr; align-content: center">

    <div>
      <q-linear-progress style="color: #6F5B3E"   :value="80" class="q-mt-md" :label="80"/>

    </div>
    <div style="padding: 4px; display: flex; align-items: center; justify-content: center">
        <q-badge style="color: #6F5B3E; background: transparent; border: 1px soli #C4AE78" label="100 %"></q-badge>
      </div>
    <div>
      <q-btn flat style="color: #171515" round size="10px" icon="thumb_up" />
    </div>
    <div>
      <q-btn flat style="color: #171515" round size="10px" icon="thumb_down" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cred',
  props: {
    claims: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
    }
  }
}
</script>

<style></style>
