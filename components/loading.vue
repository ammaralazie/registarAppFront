<template lang="html">
  <v-overlay v-if="loading" :value="overlay" color="white" :opacity="1" z-index="5000" style="opacity: 1">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    overlay: false,
  }),
  methods: {
    start() {
      this.loading = true
      this.overlay = true
    },
    finish() {
      this.loading = false
      this.overlay = false
    },
    fail(error) {
      console.error(error)
    },
  },
}
</script>