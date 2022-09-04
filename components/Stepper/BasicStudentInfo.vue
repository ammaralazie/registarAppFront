<template>
  <v-form
    ref="studentRequierdForm"
    v-model="studentRequierdForm"
    class="pt-3 pb-3"
    lazy-validation
  >
    <v-row>
      <v-col cols="12">
        <v-text-field
          :value="calculateCollegeNumber()"
          outlined
          color="accent"
          label="الرقم الاحصائي"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-text-field
          v-model="studentName"
          outlined
          color="accent"
          label="اسم الطالب"
          :rules="studentRequierdFormRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-text-field
          v-model="studentEnglishName"
          outlined
          color="accent"
          label="الاسم الانجليزي"
          :rules="studentRequierdFormRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-menu
          ref="dobMenuRef"
          v-model="dobMenuModel"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="studentDob"
              outlined
              color="accent"
              label="تاريخ الميلاد"
              v-bind="attrs"
              :rules="studentRequierdFormRules"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="studentDob"
            :active-picker.sync="dobActivePicker"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            min="1950-01-01"
            @change="saveDob"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-text-field
          v-model="studentMail"
          outlined
          color="accent"
          label="البريد الالكتروني"
          :rules="studentRequierdFormRules"
        ></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentNationality"
          outlined
          color="accent"
          label="الجنسية"
          :rules="studentRequierdFormRules"
          :items="listOfNational"
          item-color="accent"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentGender"
          outlined
          color="accent"
          label="الجنس"
          :items="selectGender"
          item-text="text"
          item-value="value"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentSection"
          outlined
          color="accent"
          readonly
          label="القسم"
          :items="selectSection"
          item-text="sectionName"
          item-value="idSection"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentStudyType"
          outlined
          color="accent"
          label="نوع الدراسة"
          :items="selectStudyType"
          item-text="text"
          item-value="value"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentLevel"
          outlined
          color="accent"
          label="المرحلة"
          :items="selectLevel"
          item-text="text"
          item-value="value"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentAcceptedType"
          outlined
          color="accent"
          label="نوع القبول"
          :items="selectAcceptedType"
          item-text="acceptedName"
          item-value="idAcceptedType"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentRegisterYear"
          outlined
          color="accent"
          label="سنة القبول"
          :items="selectRegisterYear"
          item-text="year"
          item-value="idYearStudy"
          item-color="accent"
          :rules="studentRequierdFormRules"
          return-object
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-autocomplete
          v-model="studentStatus"
          outlined
          color="accent"
          label="حالة الطالب"
          :items="selectStatus"
          item-text="statusName"
          item-value="idStudentStatus"
          item-color="accent"
          :rules="studentRequierdFormRules"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="studentNote"
          outlined
          color="accent"
          label="الملاحظات"
          :rules="studentRequierdFormRules"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-btn
      depressed
      color="warning"
      :disabled="!studentRequierdForm"
      large
      @click.stop="registerStudents"
    >
      <span class="secondary--text">تسجيل الطالب</span>
    </v-btn>
  </v-form>
</template>

<script>
import moment from 'moment'
export default {
  name: 'BasicStudentInfo',
  data() {
    return {
      dobActivePicker: null,
      dobMenuModel: false,
      studentRequierdFormRules: [(v) => !!v || 'حقل مطلوب . يرجى ادخال قيمة'],
      studentRequierdForm: false,
      studentName: '',
      studentEnglishName: 'none',
      studentDob: moment(new Date()).format('YYYY-MM-DD'),
      studentGender: '',
      studentMail: 'dijlah.student@duc.edu.iq',
      studentNationality: 'عراقي',
      studentSection: '',
      studentStudyType: '',
      studentAcceptedType: '',
      studentLevel: '',
      studentRegisterYear: {
        year: '2021-2022',
      },
      studentStatus: '',
      studentNote: 'لا يوجد',
      listOfNational: [
        'عراقي',
        'مصري',
        'سوري',
        'اردني',
        'سعودي',
        'كويتي',
        'ليبي',
        'لبناني',
        'فلسطيني',
        'سوداني',
        'جزائري',
        'مغربي',
      ],
      selectGender: [
        {
          text: 'انثى',
          value: '0',
        },
        {
          text: 'ذكر',
          value: '1',
        },
      ],
      selectStudyType: [
        {
          text: 'صباحي',
          value: '1',
        },
        {
          text: 'مسائي',
          value: '0',
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
      ],
      selectSection: [],
      selectAcceptedType: [],
      selectRegisterYear: [],
      selectStatus: [],

      sectionCode: '',
      sectionCount: '',
      collegeNumber: null,
      currentCount: {
        studentsCount: 0,
      },
    }
  },

  watch: {
    dobMenuModel(val) {
      val && setTimeout(() => (this.dobActivePicker = 'YEAR'))
    },
  },

  created() {
    this.$axios.get('sections').then((section) => {
      this.selectSection = section.data
      this.studentSection = this.$auth.user.sectionId
    })

    this.$axios.get('acceptedTypes').then((accepted) => {
      this.selectAcceptedType = accepted.data
    })

    this.$axios.get('yearStudies').then((year) => {
      this.selectRegisterYear = year.data
      const current = year.data.filter((r) => r.currentYear === true)
      this.studentRegisterYear = current[0]
    })

    this.$axios.get('studentsStatus').then((status) => {
      this.selectStatus = status.data
    })
    const loggedInUser = this.$auth.$storage.getUniversal('user')

    this.$axios
      .get(`studentsSectionCount?sectionId=${loggedInUser.sectionId}`)
      .then((status) => {
        this.currentCount = status.data
      })
  },

  methods: {
    saveDob(date) {
      this.$refs.dobMenuRef.save(date)
    },
    calculateCollegeNumber() {
      const currentSection = this.selectSection.filter(
        (x) => x.idSection === this.studentSection
      )
      const year = this.studentRegisterYear.year.split('-')[0].slice(-2)
      const sectionCode = currentSection.length > 0 ? currentSection[0].code : 0
      const dob = this.studentDob ? this.studentDob.split('-')[0].slice(-2) : 0
      const count = this.currentCount.studentsCount + 1
      return year + sectionCode + dob + count+Math.floor(Math.random() * 1000);
    },
    async registerStudents() {
      if (this.$refs.studentRequierdForm.validate()) {
        this.$toast.show('جاري تسجيل الطالب', {
          duration: 3000,
          position: 'top-center',
        })

        try {
          const loggedInUser = this.$auth.$storage.getUniversal('user')
          const student = {
            studentName: this.studentName,
            englishName: this.studentEnglishName,
            mail: this.studentMail,
            dob: this.studentDob,
            sectionId: loggedInUser.sectionId,
            nationality: this.studentNationality,
            gender: !!(this.studentGender * 1),
            studyType: !!(this.studentStudyType * 1),
            acceptedTypeId: this.studentAcceptedType * 1,
            registerYearId: this.studentRegisterYear.idYearStudy,
            studentStatusId: this.studentStatus,
            note: this.studentNote,
            collegeNumber: this.calculateCollegeNumber(),
            studentLevel: {
              create: {
                level: this.studentLevel,
                class: 'A',
                yearStudyId: this.studentRegisterYear.idYearStudy,
              },
            },
          }

          const addStudent = await this.$axios.post('addStudent', student)
          this.$toast.success('تم تسجيل الطالب بنجاح', {
            duration: 3000,
            position: 'top-center',
          })

          this.$toast.info(`الرقم الاحصائي: ${this.calculateCollegeNumber()}`, {
            duration: 7000,
            position: 'top-center',
          })

          this.$store.commit('set_stepper')
          localStorage.setItem(
            'lastStudentRegistered',
            addStudent.data.idStudent
          )
          this.$store.dispatch('saveLastStudentId', addStudent.data.idStudent)
        } catch (error) {
          console.log(error.response)
          this.$toast.error('حدث خطأ في تسجيل الطالب', {
            duration: 3000,
            position: 'top-center',
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
