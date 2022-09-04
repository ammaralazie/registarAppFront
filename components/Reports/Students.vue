/* eslint-disable vue/v-slot-style */
<template>
  <div id="StudentsMainPage">
    <!-- انشاء تقارير -->
    <v-dialog v-model="studentReportsDialog" persistent transition="slide-y-transition" max-width="750px">
      <v-card color="primary" class="shadow-1 rounded-1">
        <v-toolbar color="secondary" class="shadow-1 rounded-1">
          <h4>فرز حسب معلومات الطالب</h4>

          <v-spacer></v-spacer>

          <v-btn color="accent" icon @click="studentReportsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="pa-10">
          <v-form ref="studentReportForm" lazy-validation @submit.prevent="createStudentReports">
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-autocomplete :items="reportSelectSections" item-value="idSection" item-text="sectionName"
                  color="accent" outlined item-color="accent" label="القسم" name="sectionId" clearable></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="reportSelectRegisterYear" item-value="idYearStudy" item-text="year" color="accent"
                  outlined item-color="accent" label="سنة القبول" name="registerYearId" clearable></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="orderSelectLevel" item-value="value" item-text="text" color="accent" outlined
                  item-color="accent" label="المرحلة" name="studentLevel" clearable></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="reportSelectAcceptedType" item-value="idAcceptedType" item-text="acceptedName"
                  color="accent" outlined item-color="accent" label="نوع القبول" name="acceptedTypeId" clearable>
                </v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="reportSelectStudyType" item-value="value" item-text="text" color="accent" outlined
                  item-color="accent" label="نوع الدراسة" name="studyType" clearable></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="reportSelectRegisterYear" item-value="idYearStudy" item-text="year" color="accent"
                  outlined item-color="accent" label="سنة التخرج" name="graduationDate" clearable></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="reportSelectStatus" item-value="idStudentStatus" item-text="statusName" color="accent"
                  outlined item-color="accent" label="الحالة" name="studentStatusId" clearable></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select :items="selectGender" color="accent" outlined item-color="accent" label="الجنس" name="gender"
                  clearable></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select v-model="studentCategory" name="studentCategory" :items="selectCategory"
                  item-value="idStudyCategory" item-text="categoryName" color="accent" outlined label="الاختصاص"
                  return-object item-color="accent" @change="categorySelected"></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select v-model="studySubCategoryId" name="studySubCategoryId" :items="selectSubCategory"
                  item-value="idStudySubCategory" item-text="subCategoryName" color="accent" outlined label="الفرع"
                  item-color="accent" :disabled="!isSelectCategory"></v-select>
              </v-col>
            </v-row>

            <v-divider />
            <v-row>
              <v-col cols="12">
                <v-checkbox v-model="headers.selected" label="تحديد الكل" color="accent"
                  @change="headers.map((h) => (h.selected = true))"></v-checkbox>
              </v-col>
            </v-row>
            <v-divider />

            <v-row class="mt-5 mb-5">
              <v-col v-for="(item,index) in headers" :key="index" cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
                <v-checkbox v-model="item.selected" :label="item.text" color="accent"></v-checkbox>
              </v-col>
            </v-row>

            <v-btn block large color="success" depressed type="submit">
              انشاء التقرير
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <!-- انشاء تقارير -->

    <v-card id="tableWrapper" class="shadow-navbar rounded-1">
      <v-data-table id="studntsTable" v-model="studentSelected" :headers="headerToShow" :items="students"
        :search="search" :items-per-page="100" :item-class="row_classess" @dblclick:row="openProfile">
        <template #top>
          <v-toolbar class="shadow-navbar rounded-1 mb-8" color="primary">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="بحث في القيود..." single-line hide-details
              color="accent"></v-text-field>

            <v-spacer />

            <v-tooltip bottom color="accent" transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn icon color="accent" depressed class="primary--text ml-3" v-bind="attrs"
                  @click="studentReportsDialog = true" v-on="on">
                  <v-icon>mdi-sort</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">انشاء تقرير</span>
            </v-tooltip>

            <v-tooltip v-if="students.length > 0" bottom color="accent" transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn icon color="accent" class="primary--text ml-3" v-bind="attrs" v-on="on" @click="
                  tableExport(
                    '#studntsTable table',
                    'students',
                    'students.xls'
                  )
                ">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">تصدير الجدول</span>
            </v-tooltip>
            <h4 class="mr-10">عدد الطلاب: {{ studentsCount }}</h4>
          </v-toolbar>
        </template>

        <template #[`item.exitCauses`]="{ item }">
          <span>{{
              item.ExitCauses.length > 0
                ? item.ExitCauses[0].exitCausesTitle
                : 'لا يوجد'
          }}</span>
        </template>

        <template #[`item.age`]="{ item }">
          <span>{{ new Date().getFullYear() - item.dob.split('-')[0] }}</span>
        </template>

        <template #[`item.examNumber`]="{ item }">
          <span>{{ item.studentSchool.examNumber }}</span>
        </template>

        <template #[`item.studentGraduation`]="{ item }">
          <span>{{
              item.studentGraduation !== null ? item.studentGraduation : 'لا يوجد'
          }}</span>
        </template>

        <template #[`item.personalPhone`]="{ item }">
          <div v-if="item.studentResponsables.myPhone.length > 0">
            <div v-for="(responsables, index) in item.studentResponsables.myPhone" :key="index">
              <span v-if="responsables.responsibleName === 'رقم شخصي'" checkPrsonalPhone=true>{{
                  responsables.responsiblePhone
              }}</span>
            </div>
          </div>
          <div v-else>لايوجد</div>
        </template>

        <template #[`item.parentPhone`]="{ item }">

          <div v-if="item.studentResponsables.phoneFather.length > 0">
            <div v-for="responsables in item.studentResponsables.phoneFather" :key="responsables.idStudentResponsible">
              <span v-if="responsables.responsibleName === 'رقم الاب'">{{
                  responsables.responsiblePhone
              }}</span>
            </div>
          </div>
          <div v-else>
            لا يوجد
          </div>
        </template>

        <template #[`item.studentSchool.documentDate`]="{ item }">
          <div>
            {{ getDocumentDate(item.studentSchool) }}
          </div>

        </template>

        <template #[`item.studentSchool.certificateStatusDescription`]="{ item }">
          <div v-if="item.studentSchool">
            <div v-if="item.studentSchool.certificateStatusDescription">
              {{ item.studentSchool.certificateStatusDescription }}
            </div>
            <div v-else>
              لا يوجد
            </div>
          </div>
          <div v-else>لا يوجد</div>
        </template>

      </v-data-table>
    </v-card>

    <a id="dlink" class="d-none" href="">Download</a>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import tableToExcel from '~/plugins/TableToExcel.js'
export default {
  data() {
    return {
      phoneCount: 0,
      phoneMsg: [],
      search: '',
      studentsCount: 0,
      isLevelUpApi: false,
      isGraduationApi: false,
      graduationDate: '',
      headers: [
        {
          text: 'الرقم الجامعي',
          sortable: true,
          align: 'right',
          value: 'collegeNumber',
          width: 200,
          selected: true,
        },
        {
          text: 'اسم الطالب',
          sortable: true,
          align: 'right',
          value: 'studentName',
          width: 200,
          selected: true,
        },
        {
          text: 'الاسم الانجليزي',
          value: 'englishName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'تاريخ الميلاد',
          value: 'dob',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'العمر',
          value: 'age',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الجنس',
          value: 'gender',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الجنسية',
          value: 'nationality',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'القسم',
          value: 'section',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'المرحلة',
          value: 'level',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'نوع الدراسة',
          value: 'studyType',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'حالة الطالب',
          value: 'studentStatus',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'سبب الخروج',
          value: 'exitCauses',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'سنة القبول',
          value: 'yearStudy',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'نوع القبول',
          value: 'acceptedType',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'سنة التخرج',
          value: 'studentGraduation.yearStudy.year',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'بواسطة',
          value: 'user.userName',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'بريد الطالب',
          value: 'mail',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الشعبة',
          value: 'class',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الملاحظات',
          value: 'note',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الرقم الشخصي',
          value: 'personalPhone',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'رقم الاب',
          value: 'parentPhone',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'رقم الجنسية',
          value: 'nationalInfo.nationalNumber',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'رقم شهادة الجنسية',
          value: 'nationalityCertificate[0].nationalityNumber',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'اسم الام',
          value: 'nationalInfo.motherName',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الديانة',
          value: 'nationalInfo.religion',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'المحافظة',
          value: 'address.province.provinceName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المنطقة',
          value: 'address.district',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المحلة',
          value: 'address.avenue',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الزقاق',
          value: 'address.streetNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الدار',
          value: 'address.houseNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الرقم الامتحاني',
          value: 'studentSchool.examNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المدرسة',
          value: 'studentSchool.schoolName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المجموع',
          value: 'studentSchool.totalMarks',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'عدد المواد',
          value: 'studentSchool.lessonCount',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المعدل',
          value: 'studentSchool.average',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: '(اعدادية) سنة التخرج',
          value: 'studentSchool.yearStudy.year',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'فرع التخرج',
          value: 'studentSchool.studySubCategory.studyCategory.categoryName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الفرع الثانوي',
          value: 'studentSchool.studySubCategory.subCategoryName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الدور',
          value: 'studentSchool.passType.passName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المديرية',
          value: 'studentSchool.directorate',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'عدد الوثيقة',
          value: 'studentSchool.documentDigit',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'رقم الوثيقة',
          value: 'studentSchool.documentNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'تاريخ الوثيقة',
          value: 'studentSchool.documentDate',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'حالة الوثيقة',
          value: 'studentSchool.certificateStatus.certificateStatusName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'نص التصديق',
          value: 'studentSchool.certificateStatusDescription',
          width: 200,
          sortable: false,
          selected: false,
        },
      ],
      students: [],
      tableLoading: true,
      isStudentSelected: false,
      studentSelected: [],

      // reports
      studentReportsDialog: false,
      columnsDialog: false,

      studentReportForm: false,
      reportSelectSections: [],
      reportSelectRegisterYear: [],
      reportSelectStatus: [],
      reportSelectAcceptedType: [],
      reportSelectStudyType: [
        {
          text: 'صباحي',
          value: '1',
        },
        {
          text: 'مسائي',
          value: '0',
        },
      ],
      // reports

      selectGender: [
        {
          text: 'ذكر',
          value: '0',
        },
        {
          text: 'انثى',
          value: '1',
        },
      ],

      // admin orders
      adminOrderDialog: false,
      adminOrderForm: false,
      orderTitle: '',
      orderDescription: '',
      orderStatus: '',
      orderNumber: '',
      orderLevel: '',
      orderYear: null,
      orderDate: null,
      orderCreatedBy: '',
      orderDatePicker: null,
      orderDateMenu: false,
      orderNewLevel: '',
      orderNewClass: '',

      orderSelectTitle: [],
      orderSelectYear: [],
      orderSelectStatus: [],
      orderSelectLevel: [
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
      // admin orders

      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

      orderDateActivePicker: null,
      orderDateMenuModel: false,
      reportOrderTitleId: '',
      reportOrderNumber: '',
      reportOrderYear: '',
      reportOrderDate: null,
      orders: [],
      orderReportsForm: false,
      exitCauses: [
        'لا يوجد',
        'نقل',
        'ترقين قيد',
        'ترقين قيد بناءاّ على طلبه',
        'الغاء قبول',
        'رسوب بالغياب',
        'رسوب بالغش',
        'مزور',
        'تأجيل سنة',
      ],
      exitCausesModel: '',
      cloneHeaders: null,
      selectCategory: [],
      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',
      isSelectCategory: false,
      studySubCategoryId: '',
    }
  },

  computed: {
    headerToShow() {
      return this.headers.filter((h) => h.selected)
    },

    computedOrderSelectTitle() {
      let filterd
      if (this.isLevelUpApi) {
        filterd = this.orderSelectTitle.filter(function (order) {
          if (
            order.idOrderTitle === 17 ||
            order.idOrderTitle === 18 ||
            order.idOrderTitle === 19
          ) {
            return true
          }

          return false
        })
        return filterd
      } else if (this.isGraduationApi) {
        filterd = this.orderSelectTitle.filter(function (order) {
          if (
            order.idOrderTitle === 21 ||
            order.idOrderTitle === 22 ||
            order.idOrderTitle === 23
          ) {
            return true
          }

          return false
        })
        return filterd
      } else {
        filterd = this.orderSelectTitle.filter((o) => {
          return (
            o.idOrderTitle !== 17 &&
            o.idOrderTitle !== 18 &&
            o.idOrderTitle !== 19
          )
        })
        return filterd
      }
    },
  },

  watch: {
    orderDateMenu(val) {
      val && setTimeout(() => (this.orderDatePicker = 'YEAR'))
    },

    orderDateMenuModel(val) {
      val && setTimeout(() => (this.orderDateActivePicker = 'YEAR'))
    },
  },

  created() {
    this.cloneHeaders = _.cloneDeep(this.headers)

    this.orderSelectTitle = this.$store.state.orderTitles

    this.orderSelectYear = this.$store.state.yearStudies
    const currentYear = this.$store.state.yearStudies.filter(
      (year) => year.currentYear === true
    )
    this.orderYear = currentYear[0]
    this.reportSelectRegisterYear = this.$store.state.yearStudies

    this.reportSelectSections = this.$store.state.sections

    this.reportSelectStatus = this.$store.state.studentsStatus
    this.orderSelectStatus = this.$store.state.studentsStatus

    this.reportSelectAcceptedType = this.$store.state.acceptedTypes

    this.selectCategory = this.$store.state.studyCategories

    this.orderDate = moment(new Date().toLocaleString()).format('YYYY-MM-DD')
  },

  methods: {

    getDocumentDate(date) {
      if (date != null) {
        return moment(date.documentDate).format('YYYY-MM-DD');
      } else {
        return "";
      }
    },
    openLevelUpDialog() {
      this.orderNewLevel = this.studentSelected[0].level[0].value
    },

    categorySelected(category) {
      this.selectSubCategory = category.StudySubCategory
      this.isSelectCategory = true
    },

    resetFilterAndTableSettinges() {
      this.headers = this.cloneHeaders
    },

    row_classess(item) {
      const userSection = this.$auth.user.sectionId
      const studentSection = item.sectionId
      if (userSection !== studentSection) {
        return 'disabled_row'
      }
    },

    convertIntToText(int) {
      let str = {}
      if (int === 1) {
        str = {
          text: 'المرحلة الاولى',
          value: 1,
        }
      } else if (int === 2) {
        str = {
          text: 'المرحلة الثانية',
          value: 2,
        }
      } else if (int === 3) {
        str = {
          text: 'المرحلة الثالثة',
          value: 3,
        }
      } else if (int === 4) {
        str = {
          text: 'المرحلة الرابعة',
          value: 4,
        }
      } else if (int === 5) {
        str = {
          text: 'المرحلة الخامسة',
          value: 5,
        }
      } else {
        str = {
          text: 'متخرج',
          value: 10,
        }
      }

      return str
    },

    saveOrderDate(date) {
      this.$refs.orderDateMenu.save(date)
    },

    saveOrderDateModel(date) {
      this.$refs.orderDateMenuModel.save(date)
    },

    createStudentReports(event) {
      this.$nuxt.$loading.start()
      if (this.$refs.studentReportForm.validate()) {
        const data = Object.fromEntries(new FormData(event.target))
        /* const selectedHeader = this.headers.filter((h) => h.selected) */

        const filters = {}

        if (data.sectionId) {
          filters.sectionId = data.sectionId
        }

        if (data.registerYearId) {
          filters.registerYearId = data.registerYearId
        }

        if (data.studentStatusId) {
          filters.studentStatusId = data.studentStatusId
        }

        if (data.studyType) {
          filters.studyType = data.studyType
        }

        if (data.acceptedTypeId) {
          filters.acceptedTypeId = data.acceptedTypeId
        }

        if (data.studentLevel) {
          filters.studentLevel = data.studentLevel
        }

        if (data.graduationDate) {
          filters.studentGraduation = data.graduationDate
        }

        if (data.gender) {
          filters.gender = data.gender
        }

        if (data.studySubCategoryId) {
          filters.subCategoryId = data.studySubCategoryId
        }

        if (this.studentCategory) {
          filters.studentCategory = data.studentCategory
        }

     /*    if (this.studentCategory) {
          filters.studentCategory = data.studentCategory
        }
 */
        const queryString = Object.keys(filters)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(filters[key])
          )
          .join('&')

        if (queryString === '') {
          this.$nuxt.$loading.finish()
          this.$toast.error('يرجى اختيار محددات', {
            duration: 3000,
            position: 'top-center',
          })
        } else {
          this.$axios.get(`getStudents?${queryString}`).then((filter) => {

            this.studentsCount = filter.data.length
            this.students = filter.data.reverse().map((student) => {
              return {
                ...student,
                ExitCauses: student.ExitCauses,
                collegeNumber: student.collegeNumber,
                studentName: student.studentName,
                englishName: student.englishName,
                section: student.section.sectionName,
                studentStatus: student.studentStatus.statusName,
                province:
                  student.address !== null
                    ? student.address.province.provinceName
                    : '',
                gender: student.gender ? 'ذكر' : 'انثى',
                mail: student.mail,
                nationality: student.nationality,
                studyType: student.studyType ? 'صباحي' : 'مسائي',
                yearStudy: student.yearStudy.year,
                dob: moment(student.dob).format('YYYY-MM-DD'),
                acceptedType: student.acceptedType.acceptedName,
                schoolName:
                  student.studentSchool !== null
                    ? student.studentSchool.schoolName
                    : '',
                average:
                  student.studentSchool !== null
                    ? student.studentSchool.average
                    : '',
                graduationDate:
                  student.studentSchool !== null
                    ? student.studentSchool.graduationDate
                    : '',
                level:
                  student.studentLevel.length > 0
                    ? this.convertIntToText(student.studentLevel[0].level).text
                    : '',
                class: student.studentLevel.map((std) => {
                  return std.class
                }),
              }
            })

            this.students.forEach(item => {

              const phoneFather = []
              const myPhone = []

              if (item.studentResponsables.length > 0) {
                item.studentResponsables.forEach((value) => {
                  if (value.responsibleName === "رقم الاب") {
                    phoneFather.push(value)
                  } else if (value.responsibleName === "رقم شخصي") {
                    myPhone.push(value)
                  }/* end of if */
                })/* end of forEch */
              }/* end of if */
              item.studentResponsables = {
                phoneFather, myPhone, oldData: item.studentResponsables
              }
            })/* end of forEach */

            console.log("this.students : ", this.students)

            this.$nuxt.$loading.finish()
            this.studentReportsDialog = false
       /*      this.headers = selectedHeader */
          })
        }
      }
    },

    tableExport(id, name, file) {
      tableToExcel(id, name, file)
    },

    openProfile(event, item) {
      const { idStudent } = item.item
      this.$router.push(`/students/profile/${idStudent}`)
    },
  },
}
</script>

<style lang="scss">
.disabled_row {
  // pointer-events: none !important;

  * {
    color: #898989 !important;
  }
}
</style>