<template>
  <div class="reports-page">
    <v-toolbar color="secondary" class="shadow-navbar rounded-1 mb-5 mt-5">
      <h1>التقارير</h1>

      <v-spacer></v-spacer>

      <v-tabs v-model="model" right color="accent">
        <v-tab :href="`#tab-1`">
          <span>تقارير الطلبة</span>
        </v-tab>

        <v-tab :href="`#tab-2`">
          <span>تقارير الاوامر الادارية</span>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="model" class="shadow-navbar rounded-1">
      <v-tab-item :value="`tab-1`">
        <ReportsStudents />
      </v-tab-item>

      <v-tab-item :value="`tab-2`">
        <ReportsOrders />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 'tab-1',
    }
  },
}
</script>

<style lang="scss" scoped>
</style>