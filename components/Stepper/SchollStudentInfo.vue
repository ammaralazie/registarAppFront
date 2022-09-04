<template>
  <v-form ref="studentRequierdForm" v-model="studentRequierdForm" class="pt-3 pb-3" lazy-validation>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-text-field v-model="schoolName" color="accent" outlined label="اسم المدرسة"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
        <v-select v-model="graduationDate" outlined color="accent" label="سنة التخرج" :items="selectYear"
          item-text="year" item-value="idYearStudy" item-color="accent" return-object></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="totalMarks" color="accent" outlined label="مجموع الدرجات" type="number"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="lessonCount" color="accent" outlined label="عدد المواد" type="number"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="average" color="accent" outlined label="المعدل" type="number" disabled></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="examNumber" color="accent" outlined label="الرقم الامتحاني"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-select v-model="studentPassType" :items="selectPassType" item-value="idPassType" item-text="passName"
          color="accent" outlined label="الدور" item-color="accent"></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-select v-model="directorate" :items="directorateList" item-color="accent" color="accent" outlined
          label="المديرية"></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-select v-model="studentCategory" :items="selectCategory" item-value="idStudyCategory"
          item-text="categoryName" color="accent" outlined label="الاختصاص" return-object item-color="accent"
          @change="categorySelected"></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-select v-model="studySubCategoryId" :items="selectSubCategory" item-value="idStudySubCategory"
          item-text="subCategoryName" color="accent" outlined label="الفرع" item-color="accent"
          :disabled="!isSelectCategory"></v-select>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="documentNumber" color="accent" outlined label="رقم الوثيقة" type="number"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-menu ref="documentDateMenu" v-model="documentDateMenu" :close-on-content-click="false"
          transition="scale-transition" offset-y min-width="auto">
          <template #activator="{ on, attrs }">
            <v-text-field v-model="documentDate" label="تاريخ الوثيقة" readonly color="accent" outlined v-bind="attrs"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="documentDate" :active-picker.sync="documentDateMenuActivePicker" :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          " min="1950-01-01" @change="save"></v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-text-field v-model="documentDigit" color="accent" outlined label="عدد الوثيقة"></v-text-field>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-select v-model="certificateStatusId" :items="selectCertificatesStatus" item-value="idCertificateStatus"
          item-text="certificateStatusName" color="accent" outlined label="حالة الشهادة" item-color="accent"
          @change="certificateStatusSelected"></v-select>
      </v-col>

      <v-col cols="12">
        <v-textarea v-if="cookie.get('auth.user').roleId == 3" v-model="certificateStatusDescription" color="accent"
          outlined label="نص التصديق" :disabled="!isSelectCertificatesStatus"></v-textarea>
      </v-col>
    </v-row>

    <v-divider class="mb-5 mt-5" />

    <v-btn depressed color="warning" :disabled="!studentRequierdForm" large @click.stop="saveStudentSchool">
      <span class="secondary--text">حفظ المعلومات</span>
    </v-btn>

    <v-btn depressed color="accent" large class="mr-5 ml-5" @click="$store.commit('unset_stepper')">
      <span class="secondary--text">رجوع</span>
    </v-btn>

    <v-btn depressed color="accent" large @click="$store.commit('set_stepper')">
      <span class="secondary--text">تخطي</span>
    </v-btn>
  </v-form>
</template>

<script>
import moment from 'moment'
import * as cookie from "vue-cookies"
export default {
  data() {
    return {
      cookie,
      studentRequierdForm: false,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

      documentDateMenu: false,
      documentDateMenuActivePicker: null,

      schoolName: '',
      graduationDate: null,
      totalMarks: '',
      documentNumber: 0,
      documentDate: moment('1960-01-01').format('YYYY-MM-DD'),
      lessonCount: '',
      directorate: '',
      directorateList: [
        'لا يوجد',
        'الكرخ الاولى',
        'الكرخ الثانية',
        'الكرخ الثالثة',
        'الرصافة الاولى',
        'الرصافة الثانية',
        'الرصافة الثالثة',
        'الانبار',
        'كردستان',
        'نينوى',
        'صلاح الدين',
        'النجف الاشرف',
        'كربلاء',
        'بابل',
        'ميسان',
        'البصرة',
        'ديالى',
        'كركوك',
        'واسط',
        'ذي قار',
        'القادسية',
        'المثنى'
      ],
      studySubCategoryId: '',
      certificateStatusId: 6,
      certificateStatusDescription: 'لا يوجد',
      examNumber: 0,

      selectCategory: [],
      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',

      selectCertificatesStatus: [],
      isSelectCategory: false,
      isSelectCertificatesStatus: false,

      selectPassType: [],
      studentPassType: '',
      documentDigit: '0',

      selectYear: [],

      studentSchool: [],
      schoolId: '',

      students: [],
    }
  },

  computed: {
    average() {
      if (this.totalMarks === '' && this.lessonCount === '') {
        return ''
      } else {
        return (this.totalMarks / this.lessonCount).toFixed(3)
      }
    },

    studentId() {
      return this.$store.getters.getLastStudentRegistered
    }
  },

  watch: {
    documentDateMenu(val) {
      val && setTimeout(() => (this.documentDateMenuActivePicker = 'YEAR'))
    },
  },

  created() {
    this.$axios.get('studyCategories').then((category) => {
      this.selectCategory = category.data
    })

    this.$axios.get('students').then((student) => {
      this.students = student.data
    })

    this.$axios.get('certificatesStatus').then((status) => {
      this.selectCertificatesStatus = status.data
    })

    this.$axios.get('passTypes').then((passType) => {
      this.selectPassType = passType.data
    })

    this.$axios.get('yearStudies').then((year) => {
      this.selectYear = year.data
    })
  },

  methods: {
    save(date) {
      this.$refs.documentDateMenu.save(date)
    },

    categorySelected(category) {
      this.selectSubCategory = category.StudySubCategory
      this.isSelectCategory = true
    },

    certificateStatusSelected(status) {
      if (status === 1) {
        this.isSelectCertificatesStatus = true
      }
    },

    saveStudentSchool() {
      if (this.$refs.studentRequierdForm.validate()) {


        try {

          const school = {
            schoolName: this.schoolName,
            graduationDate: this.graduationDate.idYearStudy,
            totalMarks: this.totalMarks,
            average: this.average,
            documentNumber: this.documentNumber,
            documentDate: this.documentDate,
            lessonCount: this.lessonCount,
            directorate: this.directorate,
            studySubCategoryId: this.studySubCategoryId * 1,
            studentId: this.studentId,
            certificateStatusId: this.certificateStatusId * 1,
            certificateStatusDescription: this.certificateStatusDescription,
            passTypeId: this.studentPassType,
            documentDigit: this.documentDigit * 1,
            examNumber: this.examNumber
          }

          this.$toast.show('جاري حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })

          this.$toast.success('تم حفظ المعلومات', {
            position: 'top-center',
            duration: 3000,
          })
          this.$axios.post('addStudentSchool', school)
          this.$store.commit('set_stepper')
        } catch (e) {
          this.$toast.error('حدث خطأ في حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })
          console.error(e)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>