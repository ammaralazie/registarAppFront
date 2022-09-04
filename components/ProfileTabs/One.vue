<template>
  <div>
    <v-form ref="studentRequierdForm" v-model="studentRequierdForm" class="pt-3 pb-3" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="collegeNumber" outlined color="accent" label="الرقم الاحصائي" disabled></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field v-model="studentName" outlined color="accent" label="اسم الطالب"
            :rules="studentRequierdFormRules" :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field v-model="studentEnglishName" outlined color="accent" label="الاسم الانجليزي"
            :rules="studentRequierdFormRules" :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-menu ref="dobMenuRef" v-model="dobMenuModel" :close-on-content-click="false" transition="scale-transition"
            offset-y min-width="auto">
            <template #activator="{ on, attrs }">
              <v-text-field v-model="studentDob" outlined color="accent" label="تاريخ الميلاد" v-bind="attrs"
                :rules="studentRequierdFormRules" disabled v-on="on"></v-text-field>
            </template>

            <v-date-picker v-model="studentDob" :active-picker.sync="dobActivePicker" :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            " min="1950-01-01" @change="saveDob"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field v-model="studentMail" outlined color="accent" label="البريد الالكتروني"
            :rules="studentRequierdFormRules" :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentNationality" outlined color="accent" label="الجنسية"
            :rules="studentRequierdFormRules" :disabled="!editable" :items="[
              'عراقي',
              'مصري',
              'سوري',
              'اردني',
              'سعودي',
              'كويتي',
              'ليبي',
            ]" item-color="accent"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentGender" outlined color="accent" label="الجنس" :items="selectGender"
            item-color="accent" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentSection" outlined color="accent" label="القسم" :items="selectSection"
            item-text="sectionName" item-value="idSection" item-color="accent" return-object
            :rules="studentRequierdFormRules" disabled></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentStudyType" outlined color="accent" label="نوع الدراسة" :items="selectStudyType"
            item-color="accent" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentLevel" outlined color="accent" label="المرحلة" :items="selectLevel" item-text="text"
            item-value="value" item-color="accent" :rules="studentRequierdFormRules" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentAcceptedType" outlined color="accent" label="نوع القبول" :items="selectAcceptedType"
            item-text="acceptedName" item-value="idAcceptedType" item-color="accent" :rules="studentRequierdFormRules"
            :disabled="!editable" return-object></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentRegisterYear" outlined color="accent" label="سنة القبول" :items="selectRegisterYear"
            item-text="year" item-value="idYearStudy" item-color="accent" :rules="studentRequierdFormRules"
            :disabled="!editable" return-object></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="studentStatus" outlined color="accent" label="حالة الطالب" :items="selectStatus"
            item-text="statusName" item-value="idStudentStatus" item-color="accent" :rules="studentRequierdFormRules"
            :disabled="!editable" return-object></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="graduationDate" outlined color="accent" label="سنة التخرج" :items="selectRegisterYear"
            item-text="year" item-value="idYearStudy" item-color="accent" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="exitCause" outlined color="accent" label="سبب الخروج" :items="exitCauses"
            item-value="idExitCauses" item-text="exitCausesTitle" item-color="accent" :disabled="!editable"
            return-object></v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="studentNote" outlined color="accent" label="الملاحظات" :rules="studentRequierdFormRules"
            :disabled="!editable"></v-textarea>
        </v-col>
      </v-row>

      <v-divider class="mb-5 mt-5" />

      <v-btn color="warning" :disabled="row_classess" depressed large @click="editable = !editable">
        <span>{{ editable ? 'الغاء التحديث' : 'تحديث الطالب' }}</span>
      </v-btn>

      <v-btn v-if="editable" class="mr-5" depressed color="success" :disabled="!studentRequierdForm" large
        @click.stop="updateStudent">
        <span class="secondary--text">حفظ المعلومات</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import moment from 'moment'
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
      dobActivePicker: null,
      dobMenuModel: false,
      studentRequierdFormRules: [(v) => !!v || 'حقل مطلوب . يرجى ادخال قيمة'],
      studentRequierdForm: false,
      studentName: '',
      studentEnglishName: 'none',
      studentDob: null,
      studentGender: '',
      studentMail: 'dijlah.student@duc.edu.iq',
      studentNationality: 'عراقي',
      studentSection: '',
      studentStudyType: '',
      studentAcceptedType: '',
      studentLevel: '',
      studentRegisterYear: null,
      studentStatus: '',
      studentNote: 'لا يوجد',

      selectGender: [
        {
          text: 'انثى',
          value: 0,
        },
        {
          text: 'ذكر',
          value: 1,
        },
      ],
      selectStudyType: [
        {
          text: 'صباحي',
          value: 1,
        },
        {
          text: 'مسائي',
          value: 0,
        },
      ],
      selectLevel: [
        {
          text: 'المرحلة الاولى',
          value: 1,
        },
        {
          text: 'المرحلة الثانية',
          value: 2,
        },
        {
          text: 'المرحلة الثالثة',
          value: 3,
        },
        {
          text: 'المرحلة الرابعة',
          value: 4,
        },
        {
          text: 'المرحلة الخامسة',
          value: 5,
        },
        {
          text: 'متخرج',
          value: 10,
        },
      ],
      selectSection: [],
      selectAcceptedType: [],
      selectRegisterYear: [],
      selectStatus: [],

      collegeNumber: '',
      studentLevelId: '',
      graduationDate: '',
      exitCause: '',
      exitCauses: [
        'لا يوجد',
       /*  'نقل', */
        'ترقين قيد',
        'ترقين قيد بناءاّ على طلبه',
        'الغاء قبول',
        'رسوب بالغياب',
        'رسوب بالغش',
        'مزور',
        'تأجيل سنة',
        'تغيير قسم'
      ],
      studentExitCauses: [],
    }
  },

  computed: {
    row_classess() {
      const userSection = this.$auth.user.sectionId
      const orderSection = this.studentSection.idSection
      return userSection !== orderSection
    },
  },

  watch: {
    dobMenuModel(val) {
      val && setTimeout(() => (this.dobActivePicker = 'YEAR'))
    },
  },

  created() {
    this.$axios.get('sections').then((section) => {
      this.selectSection = section.data
    })

    this.$axios.get('acceptedTypes').then((accepted) => {
      this.selectAcceptedType = accepted.data
    })

    this.$axios.get('yearStudies').then((year) => {
      this.selectRegisterYear = year.data
    })

    this.$axios.get('studentsStatus').then((status) => {
      this.selectStatus = status.data
    })

    this.initStudent()
  },

  methods: {
    saveDob(date) {
      this.$refs.dobMenuRef.save(date)
    },

    initStudent() {
      this.$axios
        .get(`student/${this.studentId}`)
        .then((student) => {
          console.log(student.data.studyType)
          // const gender = this.selectGender.filter((gender) => {
          //   return (
          //     Boolean(gender.value * 1) === Boolean(student.data.gender * 1)
          //   )
          // })

          // const studyType = this.selectStudyType.filter((study) => {
          //   return (
          //     Boolean(study.value * 1) === Boolean(student.data.studyType * 1)
          //   )
          // })

          this.studentName = student.data.studentName
          this.studentEnglishName = student.data.englishName
          this.studentMail = student.data.mail
          this.studentDob = moment(student.data.dob).format('YYYY-MM-DD')
          this.studentSection = student.data.section
          this.studentNationality = student.data.nationality
          this.studentGender = student.data.gender ? 1 : 0
          this.studentStudyType = student.data.studyType ? 1 : 0
          this.studentAcceptedType = student.data.acceptedType
          this.studentRegisterYear = student.data.yearStudy
          this.studentStatus = student.data.studentStatus
          this.studentNote = student.data.note
          this.collegeNumber = student.data.collegeNumber
          this.studentLevel = student.data.studentLevel[0].level
          this.studentLevelId = student.data.studentLevel[0].idStudentLevel
          this.graduationDate =
            student.data.studentGraduation !== null
              ? student.data.studentGraduation.graduationDate
              : ''
          this.exitCause =
            student.data.ExitCauses.length < 1
              ? 'لا يوجد'
              : student.data.ExitCauses[0].exitCausesTitle
          this.studentExitCauses = student.data.ExitCauses

          console.log(student.data.studentLevel);
        })
        .catch((e) => {
          console.error(e)
        })
    },

    updateStudent() {
      if (this.$refs.studentRequierdForm.validate()) {
        this.$toast.show('جاري تحديث الطالب', {
          duration: 3000,
          position: 'top-center',
        })

        const student = {
          studentName: this.studentName,
          englishName: this.studentEnglishName,
          mail: this.studentMail,
          dob: this.studentDob,
          sectionId: this.studentSection.idSection,
          nationality: this.studentNationality,
          gender: Boolean(this.studentGender * 1),
          studyType: Boolean(this.studentStudyType * 1),
          acceptedTypeId: this.studentAcceptedType.idAcceptedType * 1,
          registerYearId: this.studentRegisterYear.idYearStudy,
          studentStatusId: this.studentStatus.idStudentStatus,
          graduationDate: this.graduationDate,
          note: this.studentNote,
          studentLevel: {
            idStudentLevel: this.studentLevelId,
            studentId: this.studentId,
            level: this.studentLevel,
            class: 'A',
            yearStudyId: this.studentRegisterYear.idYearStudy,
          },
        }

        this.$axios
          .put(`student/${this.studentId}`, student)
          .then((res) => {
            this.$toast.success('تم تحديث الطالب بنجاح', {
              duration: 3000,
              position: 'top-center',
            })

            console.log("idStudentStatus : ", this.studentStatus);
            console.log("studentExitCauses : ", this.studentExitCauses);

            if (this.studentExitCauses.length < 1) {
              if (this.studentStatus.idStudentStatus === 5) {
                console.log("امر الاداري يعمل ...")
                this.$axios
                  .post('addExitCauses', {
                    exitCausesTitle: this.exitCause,
                    studentId: this.studentId,
                    createdBy: this.$auth.user.idUser,
                  })
                  .then((result) => {
                    console.log(result)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              } else {
                this.$axios
                  .post(
                    'addExitCauses',{
                      studentId:this.studentStatus.studentId,
                      createdBy:this.$auth.user.userName,
                      exitCausesTitle:this.exitCause
                    }
                  )
                  .then((d) => {
                    console.log(d);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            } else {
              // eslint-disable-next-line no-lonely-if
              if (this.studentStatus.idStudentStatus === 5) {
                this.$axios
                  .put(`exitCauses/${this.studentExitCauses[0].idExitCauses}`, {
                    exitCausesTitle: this.exitCause,
                    studentId: this.studentId,
                    createdBy: this.$auth.user.idUser,
                  })
                  .then((result) => {
                    console.log(result)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              } else {
                this.$axios
                  .delete(
                    `exitCauses/${this.studentExitCauses[0].idExitCauses}`
                  )
                  .then((d) => {
                    console.log(d);
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            }
            this.editable = false
          })
          .catch((e) => {

            this.$toast.error('حدث خطأ في تحديث الطالب', {
              duration: 3000,
              position: 'top-center',
            })

            console.log("err : ", e)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>