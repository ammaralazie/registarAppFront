<template>
  <div class="sidebar__logo" :class="{ small: !showTitle }">
    <img class="sidebar__logo__image" src="../static/icon.png" />
    <span v-show="showTitle" class="sidebar__logo__title accent--text"
      >برنامج التسجيل</span
    >
  </div>
</template>

<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar__logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  max-height: 63px;
  padding: 10px;

  &__image {
    width: 55px;
    margin-left: 1em;
    border-radius: 50%;
  }

  &__title {
    color: $accent;
    font-size: 1.4em;
  }

  &.small {
    padding: 10px 0;
    height: 63px;
    .sidebar__logo__image {
      margin: 0 auto !important;
      width: 40px;
    }
  }
}
</style>