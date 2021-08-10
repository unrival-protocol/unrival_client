<template>
  <div>
    {{ something }}
  </div>
</template>
<script>
export default {
  name: 'Action',
  mounted () {
    console.log('it was mounted')
  },
  data () {
    return {
      something: 'test'
    }
  }
}
</script>
