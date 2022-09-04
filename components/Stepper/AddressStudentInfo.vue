<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-autocomplete
            v-model="provinceId"
            :items="provinces"
            item-value="idProvince"
            item-text="provinceName"
            color="accent"
            label="المحافظة"
            outlined
            
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="district"
            color="accent"
            label="المنطقة"
            outlined
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="avenue"
            color="accent"
            label="المحلة"
            outlined
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="streetNumber"
            color="accent"
            label="رقم الزقاق"
            outlined
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="houseNumber"
            color="accent"
            label="رقم الدار"
            outlined
            
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-btn depressed color="warning" large @click="saveAddress">
      <span class="secondary--text">حفظ المعلومات</span>
    </v-btn>

    <v-btn
      depressed
      color="accent"
      large
      class="mr-5 ml-5"
      @click="$store.commit('unset_stepper')"
    >
      <span class="secondary--text">رجوع</span>
    </v-btn>

    <v-btn depressed color="accent" large @click="$store.commit('set_stepper')">
      <span class="secondary--text">تخطي</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],

      provinceId: '',
      provinces: [],

      district: '',
      avenue: '',
      houseNumber: '',
      streetNumber: '',
    }
  },

  computed: {
    studentId() {
      return this.$store.getters.getLastStudentRegistered
    }
  },

  created() {
    this.$axios.get('students').then((student) => {
      this.students = student.data
    })

    this.$axios.get('provinces').then((province) => {
      this.provinces = province.data
    })
  },

  methods: {
    saveAddress() {
      try {
        this.$toast.show('جاري حفظ المعلومات...', {
          duration: 3000,
          position: 'top-center',
        })
        this.$axios.post('addAddress', {
          provinceId: this.provinceId,
          district: this.district,
          avenue: this.avenue,
          houseNumber: this.houseNumber,
          streetNumber: this.streetNumber,
          studentId: this.studentId,
        })
        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
        this.$store.commit('set_stepper')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>