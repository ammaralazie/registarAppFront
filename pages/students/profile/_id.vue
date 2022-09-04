<template>
  <div class="profile-page">
    <v-toolbar class="shadow-navbar rounded-1 mt-5" color="secondary">
      <v-toolbar-title>{{ student.studentName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="accent" @click="$router.push('/students')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card color="secondary" class="shadow-1 rounded-1 mt-5">
      <v-tabs v-model="tabs" center-active color="accent" grow centered right>
        <v-tab>المعلومات الاساسية</v-tab>
        <v-tab>معلومات ولي الامر</v-tab>
        <v-tab>معلومات المدرسة</v-tab>
        <v-tab>معلومات السكن</v-tab>
        <v-tab>الاوامر الادارية</v-tab>
        <v-tab>مراحل الطالب</v-tab>
        <v-tab>الصورة الشخصية و الوثيقة</v-tab>

        <v-tabs-items v-model="tabs" class="pa-5 border-top">
          <v-tab-item>
            <ProfileTabsOne :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsTwo :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsThree :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsFour :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsFive :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsSaven :student-id="Number($route.params.id)" />
          </v-tab-item>

          <v-tab-item>
            <ProfileTabsSix :student-id="Number($route.params.id)" />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: null,
      student: {},
    }
  },

  mounted() {
    this.getStudents()
  },

  methods: {
    async getStudents() {
      const { id } = this.$route.params
      try {
        const student = await this.$axios.get(`student/${id}`)
        this.student = student.data
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.border-top {
  border-top: 1px solid rgba($primary, 0.4);
}
</style>