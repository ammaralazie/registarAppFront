<template>
  <v-app >
    <div class="error-page">
      <div class="image">
        <img src="~/static/error.png" />
      </div>
      <div v-if="error.statusCode === 404">
        <h1 class="mb-5">
          {{ pageNotFound }}
        </h1>

        <v-btn small color="accent" to="/" class="primary--text">
          <span class="ml-5">الرئيسية</span>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>

      <div v-else>
        <h1 class="mb-5">
          {{ otherError }}
        </h1>

        <v-btn small color="accent" to="/" class="primary--text">
          <span class="ml-5">الرئيسية</span>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'errorLayout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'تعذر وجود الصفحة!!',
      otherError: 'حدث خطآ ما يرجى اعادة المحاولة',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
body,
html {
  overflow: hidden !important;
}
.error-page {
  height: 100vh;
  width: 100vw;
  background: $secondary;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .image {
    img {
      width: 500px;
      height: 500px;
    }
  }

  h1 {
    color: $accent;
  }
}
</style>
