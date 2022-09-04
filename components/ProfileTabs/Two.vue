<template>
  <div>
    <v-form @submit.prevent="saveStudentResponsible">
      <v-row>
        <v-col cols="12" md="5" lg="5" xl="5">
          <v-select
            v-model="responsibleName"
            color="accent"
            :items="phoneTypes"
            label="نوع الهاتف"
            outlined
            item-color="accent"
            :disabled="disableResponsibleInfoArea"
          ></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="5" lg="5" xl="5">
          <v-text-field
            v-model="responsiblePhone"
            color="accent"
            label="رقم ولي الامر"
            outlined
            :disabled="disableResponsibleInfoArea"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="2" lg="2" xl="2">
          <v-btn
            v-if="!disableResponsibleInfoArea"
            color="success"
            depressed
            large
            block
            @click="saveStudentResponsible"
          >
            <span class="primary--text">حفظ المعلومات</span>
          </v-btn>

          <v-btn
            v-if="disableResponsibleInfoArea"
            color="warning"
            depressed
            large
            block
            :disabled="row_classess"
            @click="disableResponsibleInfoArea = false"
          >
            <span class="primary--text">تعديل المعلومات</span>
          </v-btn>
        </v-col>

        <v-col cols="12" class="mb-5">
          <v-card color="primary" elevation="0">
            <v-list
              v-for="responsables in responsibleInfo"
              :key="responsables.idStudentResponsible"
              nav
              dense
              outlined
            >
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon class="grey lighten-1"> mdi-phone </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-text="responsables.responsibleName"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="responsables.responsiblePhone"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon :disabled="row_classess" @click="deletePhoneNmuber(responsables)">
                    <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-5">
        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field
            v-model="nationalNumber"
            color="accent"
            label="رقم الجنسية"
            outlined
            :disabled="disableNationalInfoArea"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field
            v-model="motherName"
            color="accent"
            label="اسم الام"
            outlined
            :disabled="disableNationalInfoArea"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="2" lg="2" xl="2">
          <v-text-field
            v-model="religion"
            color="accent"
            label="الديانة"
            outlined
            :disabled="disableNationalInfoArea"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="2" lg="2" xl="2">
          <v-btn
            v-if="!disableNationalInfoArea"
            color="success"
            depressed
            large
            block
            @click="saveStudentNational"
          >
            <span class="primary--text">حفظ المعلومات</span>
          </v-btn>

          <v-btn
            v-if="disableNationalInfoArea"
            color="warning"
            depressed
            large
            block
            :disabled="row_classess"
            @click="disableNationalInfoArea = false"
          >
            <span class="primary--text">تعديل المعلومات</span>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider />

      <v-row class="mt-5">
        <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">
          <v-text-field
            v-model="nationalityCertificateNumber"
            color="accent"
            label="رقم شهادة الجنسية"
            outlined
            :disabled="disableNationalityCertificateArea"
          ></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="2" lg="2" xl="2">
          <v-btn
            v-if="!disableNationalityCertificateArea"
            color="success"
            depressed
            large
            block
            @click="saveStudentNationalCertificate"
          >
            <span class="primary--text">حفظ المعلومات</span>
          </v-btn>

          <v-btn
            v-if="disableNationalityCertificateArea"
            color="warning"
            depressed
            large
            block
            :disabled="row_classess"
            @click="disableNationalityCertificateArea = false"
          >
            <span class="primary--text">تعديل المعلومات</span>
          </v-btn>
        </v-col>
      </v-row>
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
      disableNationalInfoArea: true,
      disableResponsibleInfoArea: true,
      disableNationalityCertificateArea: true,
      responsibleName: '',
      responsiblePhone: '',
      nationalityCertificateNumber: '',
      nationalNumber: '',
      religion: 'مسلم',
      motherName: '',
      phoneTypes: ['رقم الام', 'رقم الاب', 'رقم الاقارب', 'رقم شخصي'],
      responsibleInfo: [],
      idNationalityCertificate: '',
      idNationalInfo: '',
      studentSection: ''
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
    this.fetchStudents()
  },

  methods: {
    fetchStudents() {
      this.$axios.get(`student/${this.studentId}`).then((student) => {
        this.studentSection = student.data.sectionId
        this.responsibleInfo = student.data.studentResponsables
        if (student.data.nationalInfo !== null) {
          this.motherName = student.data.nationalInfo.motherName
          this.nationalNumber = student.data.nationalInfo.nationalNumber
          this.religion = student.data.nationalInfo.religion
          this.idNationalInfo = student.data.nationalInfo.idNationalInfo
        }

        if (student.data.nationalityCertificate.length > 0) {
          this.nationalityCertificateNumber =
            student.data.nationalityCertificate[0].nationalityNumber
          this.idNationalityCertificate =
            student.data.nationalityCertificate[0].idNationalityCertificate
        }
      })
    },

    saveStudentResponsible() {
      try {
        this.$toast.show('جاري حفظ المعلومات...', {
          duration: 3000,
          position: 'top-center',
        })

        this.$axios.post('addManyResponsible', {
          responsibleName: this.responsibleName,
          responsiblePhone: this.responsiblePhone,
          studentId: this.studentId,
        })

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })

        this.disableResponsibleInfoArea = true
        this.responsibleInfo.push({
          responsibleName: this.responsibleName,
          responsiblePhone: this.responsiblePhone,
          studentId: this.studentId,
        })
      } catch (e) {
        console.error(e.response)
      }
    },

    saveStudentNational() {
      try {
        this.$toast.show('جاري حفظ المعلومات...', {
          duration: 3000,
          position: 'top-center',
        })

        this.$axios.post('addNationalInfo', {
          idNationalInfo: this.idNationalInfo,
          nationalNumber: this.nationalNumber,
          motherName: this.motherName,
          religion: this.religion,
          studentId: this.studentId,
        })

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })

        this.disableNationalInfoArea = true
      } catch (e) {
        console.error(e.response)
      }
    },

    saveStudentNationalCertificate() {
      try {
        this.$toast.show('جاري حفظ المعلومات...', {
          duration: 3000,
          position: 'top-center',
        })

        this.$axios.post('addNationalityCertificate', {
          nationalityNumber: this.nationalityCertificateNumber,
          idNationalityCertificate: this.idNationalityCertificate,
          studentId: this.studentId,
        })

        this.$toast.success('تم حفظ المعلومات', {
          duration: 3000,
          position: 'top-center',
        })

        this.disableNationalityCertificateArea = true
      } catch (e) {
        console.error(e.response.errorMessage)
      }
    },

    deletePhoneNmuber(item) {
      try {
        this.$toast.show('جاري حذف الرقم...', {
          duration: 3000,
          position: 'top-center',
        })

        this.$axios.delete(`studentResponsible/${item.idStudentResponsible}`)

        this.$toast.success('تم حذف الرقم بنجاح', {
          duration: 3000,
          position: 'top-center',
        })

        this.responsibleInfo.splice(item, 1)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>