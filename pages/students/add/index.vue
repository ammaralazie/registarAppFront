<template>
  <div id="addStudnetsPage">
    <v-toolbar class="shadow-navbar rounded-1 mt-5" color="secondary" >
      <v-toolbar-title>اضافة طالب جديد</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="accent" @click="$router.push('/students')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="shadow-navbar rounded-1 mt-5 pa-0" color="secondary">
      <v-stepper v-model="stepper" class="secondary" flat>
        <v-stepper-header class="elevation-0 primary">
          <!-- المعلومات الاساسية -->
          <v-stepper-step step="1" :complete="$store.state.stepper > 1">
            <span>المعلومات الاساسية</span>
          </v-stepper-step>
          <!-- المعلومات الاساسية -->

          <v-divider></v-divider>

          <!-- معلومات ولي الامر -->
          <v-stepper-step step="2" :complete="$store.state.stepper > 2">
            <span>معلومات ولي الامر</span>
          </v-stepper-step>
          <!-- معلومات ولي الامر -->

          <v-divider></v-divider>

          <!-- معلومات المدرسة -->
          <v-stepper-step step="3" :complete="$store.state.stepper > 3">
            <span>معلومات المدرسة</span>
          </v-stepper-step>
          <!-- معلومات المدرسة -->

          <v-divider></v-divider>

          <!-- معلومات السكن -->
          <v-stepper-step step="4" :complete="$store.state.stepper > 4">
            <span>معلومات السكن</span>
          </v-stepper-step>
          <!-- معلومات السكن -->

          <v-divider></v-divider>

          <!-- رفع الصور -->
          <v-stepper-step step="5" :complete="$store.state.stepper > 5">
            <span>رفع الصور</span>
          </v-stepper-step>
          <!-- رفع الصور -->
        </v-stepper-header>


        <v-stepper-items>
          <!-- المعلومات الاساسية -->
          <v-stepper-content step="1">
            <StepperBasicStudentInfo />
          </v-stepper-content>
          <!-- المعلومات الاساسية -->

          <!-- معلومات ولي الامر -->
          <v-stepper-content step="2">
            <StepperResponsibleStudentInfo />
          </v-stepper-content>
          <!-- معلومات ولي الامر -->

          <!-- معلومات المدرسة -->
          <v-stepper-content step="3">
            <StepperSchollStudentInfo />
          </v-stepper-content>
          <!-- معلومات المدرسة -->

          <!-- معلومات السكن -->
          <v-stepper-content step="4">
            <StepperAddressStudentInfo />
          </v-stepper-content>
          <!-- معلومات السكن -->

          <!-- رفع الصور -->
          <v-stepper-content step="5">
            <StepperUploadAttachments />
          </v-stepper-content>
          <!-- رفع الصور -->
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
// syear-stdId-secCode
export default {
  data() {
    return {}
  },


  computed: {
    stepper() {
      return this.$store.state.stepper
    }
  },

  watch: {
    dobMenu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  destroyed() {
    this.$store.commit('reset_stepper')
  }
}
</script>

<style lang="scss" scoped>
</style>