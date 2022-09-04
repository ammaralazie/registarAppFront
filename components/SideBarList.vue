<template>
  <v-list nav>
    <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content v-show="showTitle">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
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
  data() {
    return {
      items: [
        {
          title: 'الرئيسية',
          icon: 'la-home',
          to: '/',
        },

        {
          title: 'الاوامر الادارية',
          icon: 'la-sitemap',
          to: '/orders',
        },

        {
          title: 'الطلاب',
          icon: 'la-users-cog',
          to: '/students',
        },

        {
          title: 'التقارير',
          icon: 'la-chart-bar',
          to: '/reports',
        },

        {
          title: 'المستخدمين',
          icon: 'la-user',
          to: '/users',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>