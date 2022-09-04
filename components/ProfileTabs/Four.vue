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
            item-color="accent"
            color="accent"
            label="المحافظة"
            outlined
            :disabled="!editable"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="district"
            color="accent"
            label="المنطقة"
            outlined
            :disabled="!editable"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-text-field
            v-model="avenue"
            color="accent"
            label="المحلة"
            outlined
            :disabled="!editable"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-text-field
            v-model="streetNumber"
            color="accent"
            label="رقم الزقاق"
            outlined
            :disabled="!editable"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-text-field
            v-model="houseNumber"
            color="accent"
            label="رقم الدار"
            outlined
            :disabled="!editable"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="mb-5 mt-5" />

      <v-btn color="warning" :disabled="row_classess" depressed large @click="editable = !editable">
        <span>{{ editable ? 'الغاء التحديث' : 'تحديث المعلومات' }}</span>
      </v-btn>

      <v-btn
        v-if="editable"
        class="mr-5"
        depressed
        color="success"
        large
        @click.stop="saveAddress"
      >
        <span class="secondary--text">حفظ المعلومات</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editable: false,
      students: [],

      provinceId: '',
      provinces: [],

      district: '',
      avenue: '',
      houseNumber: '',
      streetNumber: '',
      idAddress: '',
      studentSection: '',
    }
  },

  computed: {
    row_classess() {
      const userSection = this.$auth.user.sectionId
      const orderSection = this.studentSection
      return userSection !== orderSection
    },
  },

  mounted() {
    this.$axios.get('provinces').then((province) => {
      this.provinces = province.data
    })

    this.fetchStudents()
  },

  methods: {
    fetchStudents() {
      this.$axios.get(`student/${this.studentId}`).then((student) => {
        this.studentSection = student.data.sectionId

        if (student.data.address !== null) {
          this.idAddress = student.data.address.idAddress
          this.provinceId = student.data.address.provinceId
          this.district = student.data.address.district
          this.avenue = student.data.address.avenue
          this.houseNumber = student.data.address.houseNumber
          this.streetNumber = student.data.address.streetNumber
        }

        this.students = student.data
      })
    },

    saveAddress() {
      try {
        this.$toast.show('جاري حفظ المعلومات...', {
          duration: 3000,
          position: 'top-center',
        })

        const data = {
          idAddress: this.idAddress,
          provinceId: this.provinceId,
          district: this.district,
          avenue: this.avenue,
          houseNumber: this.houseNumber,
          streetNumber: this.streetNumber,
          studentId: this.studentId,
        }

        this.$axios.post('addAddress', data)

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })

        this.editable = false
      } catch (e) {
        console.error(e.response)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>