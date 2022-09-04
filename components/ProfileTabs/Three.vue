<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-text-field v-model="schoolName" color="accent" outlined label="اسم المدرسة" :disabled="!editable">
          </v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="graduationDate" outlined color="accent" label="سنة التخرج" :items="selectYear"
            item-text="year" item-value="idYearStudy" item-color="accent" return-object :disabled="!editable">
          </v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="totalMarks" color="accent" outlined label="مجموع الدرجات" type="number"
            :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="lessonCount" color="accent" outlined label="عدد المواد" type="number"
            :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="average" color="accent" outlined label="المعدل" type="number" disabled></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="examNumber" color="accent" outlined label="الرقم الامتحاني" :disabled="!editable">
          </v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-select v-model="studentPassType" :items="selectPassType" item-value="idPassType" item-text="passName"
            color="accent" outlined label="الدور" item-color="accent" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-select v-model="directorate" :items="directorateList" item-color="accent" color="accent" outlined
            label="المديرية" :disabled="!editable"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-select v-model="studentCategory" :items="selectCategory" item-value="idStudyCategory"
            item-text="categoryName" color="accent" outlined label="الاختصاص" return-object item-color="accent"
            :disabled="!editable" @change="categorySelected"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-select v-model="studySubCategoryId" :items="selectSubCategory" item-value="idStudySubCategory"
            item-text="subCategoryName" color="accent" outlined label="الفرع" item-color="accent" :disabled="!editable">
          </v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="documentNumber" color="accent" outlined label="رقم الوثيقة" type="number"
            :disabled="!editable"></v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-menu ref="documentDateMenu" v-model="documentDateMenu" :close-on-content-click="false"
            transition="scale-transition" offset-y min-width="auto">
            <template #activator="{ on, attrs }">
              <v-text-field v-model="documentDate" label="تاريخ الوثيقة" readonly color="accent" outlined v-bind="attrs"
                :disabled="!editable" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="documentDate" :active-picker.sync="documentDateMenuActivePicker" :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            " min="1950-01-01" @change="save"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-text-field v-model="documentDigit" color="accent" outlined label="عدد الوثيقة" :disabled="!editable">
          </v-text-field>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
          <v-select v-model="certificateStatusId" :items="selectCertificatesStatus" item-value="idCertificateStatus"
            item-text="certificateStatusName" color="accent" outlined label="حالة الشهادة" item-color="accent"
            :disabled="!editable" @change="certificateStatusSelected"></v-select>
        </v-col>

        <v-col v-if="cookie.get('auth.user').roleId == 3" cols="12">
          <v-textarea v-model="certificateStatusDescription" color="accent" outlined label="نص التصديق"
            :disabled="!isSelectCertificatesStatus"></v-textarea>
        </v-col>
        <v-col v-else cols="12">
          <v-textarea v-model="certificateStatusDescription" color="accent" outlined label="نص التصديق" disabled>
          </v-textarea>
        </v-col>
      </v-row>

      <v-divider class="mb-5 mt-5" />

      <v-btn color="warning" depressed large :disabled="row_classess" @click="editable = !editable">
        <span>{{ editable ? 'الغاء التحديث' : 'تحديث الطالب' }}</span>
      </v-btn>

      <v-btn v-if="editable" class="mr-5" depressed color="success" large @click.stop="saveStudentSchool">
        <span class="secondary--text">حفظ المعلومات</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
// import _ from 'lodash'
import moment from 'moment'
import * as cookie from "vue-cookies"
export default {
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      cookie,
      editable: false,
      documentDateMenu: false,
      documentDateMenuActivePicker: null,

      schoolName: '',
      graduationDate: '',
      totalMarks: '',
      documentNumber: '',
      documentDate: '',
      examNumber: '',
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
        'المثنى',
      ],
      studySubCategoryId: '',
      certificateStatusId: '',
      certificateStatusDescription: 'لا يوجد',

      selectCategory: [],
      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',

      selectCertificatesStatus: [],
      isSelectCategory: false,
      isSelectCertificatesStatus: false,

      selectPassType: [],
      studentPassType: '',
      documentDigit: '',

      selectYear: [],

      studentSchool: [],
      schoolId: '',
      studentSection: ''
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

    row_classess() {
      const userSection = this.$auth.user.sectionId
      const orderSection = this.studentSection
      return userSection !== orderSection
    },
  },

  watch: {
    documentDateMenu(val) {
      val && setTimeout(() => (this.documentDateMenuActivePicker = 'YEAR'))
    },

    studentCategory(val) {
      this.categorySelected(val)
    },
  },

  mounted() {
    this.$axios.get('studyCategories').then((category) => {
      this.selectCategory = category.data
    })

    this.$axios.get('passTypes').then((passType) => {
      this.selectPassType = passType.data
    })

    this.$axios.get('yearStudies').then((year) => {
      this.selectYear = year.data
    })

    this.$axios.get(`student/${this.studentId}`).then((student) => {
      console.log(student.data)
      this.studentSection = student.data.sectionId

      if (student.data.studentSchool !== null) {
        this.$axios
          .get(
            `studySubCategory/${student.data.studentSchool.studySubCategoryId}`
          )
          .then((subCate) => {
            this.$axios
              .get(`studyCategory/${subCate.data.studyCategoryId}`)
              .then((cate) => {
                const studyCate = this.selectCategory.filter(
                  (c) => c.idStudyCategory === cate.data.idStudyCategory
                )

                this.studySubCategoryId =
                  student.data.studentSchool.studySubCategoryId
                this.studentCategory = studyCate[0]

                this.categorySelected(studyCate)
              })
          })

        this.studentSchool = student.data
        this.schoolName = student.data.studentSchool.schoolName
        this.graduationDate = student.data.studentSchool.graduationDate
        this.totalMarks = student.data.studentSchool.totalMarks
        this.documentNumber = student.data.studentSchool.documentNumber
        this.documentDate = moment(student.data.studentSchool.documentDate).format('YYYY-MM-DD')
        this.examNumber = student.data.studentSchool.examNumber
        this.lessonCount = student.data.studentSchool.lessonCount
        this.directorate = student.data.studentSchool.directorate
        this.certificateStatusId =
          student.data.studentSchool.certificateStatusId
        this.studySubCategoryId = student.data.studentSchool.studySubCategoryId
        this.certificateStatusDescription =
          student.data.studentSchool.certificateStatusDescription
        this.documentDigit = student.data.studentSchool.documentDigit
        this.studentPassType = student.data.studentSchool.passTypeId
        this.schoolId = student.data.studentSchool.idStudentSchool
      }
    })

    this.$axios.get('certificatesStatus').then((status) => {
      if (cookie.get('auth.user').roleId !== 3 && (this.certificateStatusDescription === 'لا يوجد' || this.certificateStatusDescription === 'لايوجد')) {
        const certifucatStatues = status.data.filter(function (value) {
          if (value.idCertificateStatus === 1 || value.idCertificateStatus === 3) {
            console.log("this section is working ...", value.idCertificateStatus)
            return null
          } else {
            return value
          }/* end of if */
        })/* end of filter */
        this.selectCertificatesStatus = certifucatStatues
        console.log("this condation is working ...", this.selectCertificatesStatus)
      } else {
        this.selectCertificatesStatus = status.data
      }/* end of if */
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
        console.log("srtification is working ...")
        this.isSelectCertificatesStatus = true
      }
    },

    saveStudentSchool() {
      const school = {
        schoolName: this.schoolName,
        graduationDate: this.graduationDate.idYearStudy,
        totalMarks: this.totalMarks,
        average: this.average * 1,
        documentNumber: this.documentNumber.toString(),
        documentDate: this.documentDate,
        lessonCount: this.lessonCount,
        directorate: this.directorate,
        studySubCategoryId: this.studySubCategoryId * 1,
        studentId: this.studentId,
        certificateStatusId: this.certificateStatusId,
        certificateStatusDescription: this.certificateStatusDescription,
        passTypeId: this.studentPassType,
        documentDigit: this.documentDigit,
        examNumber: this.examNumber,
      }

      this.$toast.show('جاري حفظ المعلومات', {
        duration: 3000,
        position: 'top-center',
      })

      if (this.studentSchool === null || this.studentSchool.length < 1) {
        try {
          this.$axios.post('addStudentSchool', school)

          this.$toast.success('تم حفظ المعلومات', {
            position: 'top-center',
            duration: 3000,
          })
          this.editable = false
        } catch (e) {
          this.$toast.error('حدث خطأ في حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })
          console.error(e)
        }
      } else {
        try {
          this.$axios.put(`studentSchool/${this.schoolId}`, school)

          this.$toast.success('تم حفظ المعلومات', {
            position: 'top-center',
            duration: 3000,
          })
          this.isSelectCertificatesStatus = false
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