<template>
  <div>
    <v-dialog
      v-model="reportsDialog"
      persistent
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card color="secondary" class="shadow-1 rounded-1">
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h4>فرز الاوامر الادارية</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="reportsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-form
            ref="reportsForm"
            v-model="reportsForm"
            @submit.prevent="createReports"
          >
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-autocomplete
                  name="reportStudentId"
                  :items="students"
                  color="accent"
                  item-text="studentName"
                  item-value="idStudent"
                  outlined
                  label="اسم الطالب"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select
                  :items="orderSelectLevel"
                  item-value="value"
                  item-text="text"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="مرحلة الامر"
                  name="orderLevel"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-autocomplete
                  name="reportOrderTitleId"
                  :items="selectOrderTitle"
                  item-text="title"
                  item-value="idOrderTitle"
                  item-color="accent"
                  color="accent"
                  outlined
                  label="عنوان الامر"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  name="reportOrderNumber"
                  color="accent"
                  outlined
                  label="رقم الامر"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select
                  v-model="reportOrderYear"
                  name="reportOrderYear"
                  :items="selectOrderYear"
                  item-value="idYearStudy"
                  item-text="year"
                  item-color="accent"
                  color="accent"
                  outlined
                  label="سنة الامر"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-menu
                  ref="orderDateMenuModel"
                  v-model="orderDateMenuModel"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="reportOrderDate"
                      name="reportOrderDate"
                      outlined
                      color="accent"
                      label="تاريخ الامر"
                      v-bind="attrs"
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="reportOrderDate"
                    :active-picker.sync="orderDateActivePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="saveOrderDate"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-divider />

            <v-row class="mt-5 mb-5">
              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-autocomplete
                  :items="reportSelectSections"
                  item-value="idSection"
                  item-text="sectionName"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="القسم"
                  name="sectionId"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select
                  :items="reportSelectRegisterYear"
                  item-value="idYearStudy"
                  item-text="year"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="سنة القبول"
                  name="registerYearId"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select
                  :items="reportSelectStatus"
                  item-value="idStudentStatus"
                  item-text="statusName"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="حالة الطالب"
                  name="studentStatusId"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select
                  outlined
                  color="accent"
                  label="الجنس"
                  :items="selectGender"
                  item-text="text"
                  item-value="value"
                  item-color="accent"
                  name="gender"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select
                  :items="reportSelectStudyType"
                  item-value="value"
                  item-text="text"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="نوع الدراسة"
                  name="studyType"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                <v-select
                  :items="orderSelectLevel"
                  item-value="value"
                  item-text="text"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="مرحلة الطالب"
                  name="studentLevel"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                <v-select
                  :items="reportSelectRegisterYear"
                  item-value="idYearStudy"
                  item-text="year"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="سنة التخرج"
                  name="graduationDate"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <v-select
                  v-model="studentCategory"
                  :items="selectCategory"
                  item-value="idStudyCategory"
                  item-text="categoryName"
                  color="accent"
                  outlined
                  label="الاختصاص"
                  return-object
                  item-color="accent"
                  @change="categorySelected"
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <v-select
                  v-model="studySubCategoryId"
                  :items="selectSubCategory"
                  item-value="idStudySubCategory"
                  item-text="subCategoryName"
                  color="accent"
                  outlined
                  label="الفرع"
                  item-color="accent"
                  :disabled="!isSelectCategory"
                ></v-select>
              </v-col>
            </v-row>

            <v-divider />
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="headers.selected"
                  label="تحديد الكل"
                  color="accent"
                  @change="headers.map((h) => (h.selected = true))"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-divider />
            <v-row class="mt-5 mb-5">
              <v-col
                v-for="item in headers"
                :key="item.value"
                cols="12"
                xs="12"
                sm="12"
                md="3"
                lg="3"
                xl="3"
              >
                <v-checkbox
                  v-model="item.selected"
                  :label="item.text"
                  color="accent"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-btn type="submit" color="success" block depressed>
              <span class="secondary--text">تطبيق الفرز</span>
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-card id="tableWrapper" class="shadow-navbar rounded-1">
      <v-data-table
        id="orderTable"
        :headers="selectedHeader"
        :items="orders"
        :search="search"
        :item-class="row_classess"
      >
        <template #top>
          <v-toolbar color="primary" class="shadow-navbar rounded-1 mb-8">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="بحث في الاوامر الادارية..."
              single-line
              hide-details
              color="accent"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-tooltip bottom color="accent" transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn
                  light
                  color="accent"
                  depressed
                  class="ml-3 primary--text"
                  v-bind="attrs"
                  icon
                  v-on="on"
                  @click="reportsDialog = true"
                >
                  <v-icon>mdi-sort</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">انشاء تقرير</span>
            </v-tooltip>

            <v-tooltip
              v-if="orders.length > 0"
              bottom
              color="accent"
              transition="slide-y-transition"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="accent"
                  class="primary--text ml-3"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    tableExport('#orderTable table', 'orders', 'reports.xls')
                  "
                >
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
              <span class="primary--text">تصدير الجدول</span>
            </v-tooltip>

            <h4 class="mr-10">عدد الاوامر الادارية: {{ ordersCount }}</h4>
          </v-toolbar>
        </template>

        <template #[`item.exitCauses`]="{ item }">
          <span>{{
            item.student.ExitCauses.length > 0
              ? item.student.ExitCauses[0].exitCausesTitle
              : 'لا يوجد'
          }}</span>
        </template>

        <template #[`item.age`]="{ item }">
          <span>{{
            new Date().getFullYear() - item.student.dob.split('-')[0]
          }}</span>
        </template>

        <template #[`item.examNumber`]="{ item }">
          <span>{{ item.student.studentSchool.examNumber }}</span>
        </template>

        <template #[`item.student.studentGraduation`]="{ item }">
          <span>{{
            item.student.studentGraduation !== null
              ? item.student.studentGraduation
              : 'لا يوجد'
          }}</span>
        </template>

        <template #[`item.personalPhone`]="{ item }">
          <div
            v-for="responsables in item.student.studentResponsables"
            :key="responsables.idStudentResponsible"
          >
            <span v-if="responsables.responsibleName === 'رقم شخصي'">{{
              responsables.responsiblePhone
            }}</span>
            <span v-else>لا يوجد</span>
          </div>
        </template>

        <template #[`item.parentPhone`]="{ item }">
          <div
            v-for="responsables in item.student.studentResponsables"
            :key="responsables.idStudentResponsible"
          >
            <span v-if="responsables.responsibleName === 'رقم الاب'">{{
              responsables.responsiblePhone
            }}</span>
            <span v-else>لا يوجد</span>
          </div>
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
      ordersCount: 0,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
      loading: true,
      orderDateActivePicker: null,
      orderDateMenuModel: false,
      reportsDialog: false,
      orders: [],
      students: [],
      search: '',
      orderYearText: '',
      reportsForm: false,

      // reports
      reportOrderTitleId: '',
      reportOrderNumber: '',
      reportOrderYear: '',
      reportOrderDate: null,
      reportStudentId: '',

      selectOrderTitle: [],
      selectOrderYear: [],

      reportSelectSections: [],
      reportSelectRegisterYear: [],
      reportSelectStatus: [],
      reportSelectAcceptedType: [],
      studentGender: '',
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

      headers: [
        {
          text: 'الرقم الجامعي',
          sortable: true,
          align: 'right',
          value: 'student.collegeNumber',
          width: 200,
          selected: true,
        },
        {
          text: 'اسم الطالب',
          sortable: true,
          align: 'right',
          value: 'student.studentName',
          width: 200,
          selected: true,
        },
        {
          text: 'الاسم الانجليزي',
          value: 'student.englishName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'تاريخ الميلاد',
          value: 'student.dob',
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
          value: 'student.gender',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الجنسية',
          value: 'student.nationality',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'القسم',
          value: 'student.section',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'المرحلة',
          value: 'student.level',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'نوع الدراسة',
          value: 'student.studyType',
          width: 200,
          sortable: false,
          selected: true,
        },
        {
          text: 'حالة الطالب',
          value: 'student.studentStatus',
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
          value: 'student.yearStudy',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'نوع القبول',
          value: 'student.acceptedType',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'سنة التخرج',
          value: 'student.studentGraduation.yearStudy.year',
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
          value: 'student.mail',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الشعبة',
          value: 'student.class',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الملاحظات',
          value: 'student.note',
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
          value: 'student.nationalInfo.nationalNumber',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'رقم شهادة الجنسية',
          value: 'student.nationalityCertificate[0].nationalityNumber',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'اسم الام',
          value: 'student.nationalInfo.motherName',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'الديانة',
          value: 'student.nationalInfo.religion',
          width: 200,
          sortable: false,
          selected: false,
        },

        {
          text: 'المحافظة',
          value: 'student.address.province.provinceName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المنطقة',
          value: 'student.address.district',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المحلة',
          value: 'student.address.avenue',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الزقاق',
          value: 'student.address.streetNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الدار',
          value: 'student.address.houseNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الرقم الامتحاني',
          value: 'student.studentSchool.examNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المدرسة',
          value: 'student.studentSchool.schoolName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المجموع',
          value: 'student.studentSchool.totalMarks',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'عدد المواد',
          value: 'student.studentSchool.lessonCount',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المعدل',
          value: 'student.studentSchool.average',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: '(اعدادية) سنة التخرج',
          value: 'student.studentSchool.yearStudy.year',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'فرع التخرج',
          value:
            'student.studentSchool.studySubCategory.studyCategory.categoryName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الفرع الثانوي',
          value: 'student.studentSchool.studySubCategory.subCategoryName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'الدور',
          value: 'student.studentSchool.passType.passName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المديرية',
          value: 'student.studentSchool.directorate',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'رقم الوثيقة',
          value: 'student.studentSchool.documentDigit',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'عدد الوثيقة',
          value: 'student.studentSchool.documentNumber',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'تاريخ الوثيقة',
          value: 'student.studentSchool.documentDate',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'حالة الوثيقة',
          value:
            'student.studentSchool.certificateStatus.certificateStatusName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'عنوان الامر',
          value: 'orderTitle.title',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'رقم الامر',
          value: 'orderNumber',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'سنة الامر',
          value: 'yearStudy.year',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'تاريخ الامر',
          value: 'orderDate',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'مرحلة الامر',
          value: 'orderLevel',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
        {
          text: 'نص الامر',
          value: 'orderDescription',
          sortable: false,
          align: 'start',
          selected: false,
          width: 200,
        },
      ],

      cloneHeaders: null,

      orderTitle: '',
      orderNumber: '',
      orderLevel: '',
      orderYear: null,
      orderDate: null,
      orderStatus: '',
      orderCreatedBy: '',
      orderDatePicker: null,
      orderDateMenu: false,

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
      ],
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

      selectCategory: [],
      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',
      isSelectCategory: false,
      studySubCategoryId: '',
    }
  },

  computed: {
    selectedHeader() {
      return this.headers.filter((h) => h.selected)
    },
  },

  watch: {
    orderDateMenuModel(val) {
      val && setTimeout(() => (this.orderDateActivePicker = 'YEAR'))
    },

    orderDateMenu(val) {
      val && setTimeout(() => (this.orderDatePicker = 'YEAR'))
    },
  },

  mounted() {
    this.cloneHeaders = _.cloneDeep(this.headers)

    this.selectOrderTitle = this.$store.state.orderTitels
    this.selectOrderYear = this.$store.state.yearStudies
    this.orderSelectYear = this.$store.state.yearStudies
    this.reportSelectRegisterYear = this.$store.state.yearStudies
    this.reportSelectStatus = this.$store.state.studentsStatus
    this.orderSelectStatus = this.$store.state.studentsStatus

    this.reportSelectSections = this.$store.state.sections

    this.reportSelectAcceptedType = this.$store.state.acceptedTypes
    this.selectCategory = this.$store.state.studyCategories
  },

  methods: {
    categorySelected(category) {
      this.selectSubCategory = category.StudySubCategory
      this.isSelectCategory = true
    },

    saveOrderDate(date) {
      this.$refs.orderDateMenuModel.save(date)
    },

    row_classess(item) {
      const userSection = this.$auth.user.sectionId
      const orderSection = item.user.sectionId
      if (userSection !== orderSection) {
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

    createReports(event) {
      this.$nuxt.$loading.start()
      if (this.$refs.reportsForm.validate()) {
        const data = Object.fromEntries(new FormData(event.target))
        this.loading = true

        const filters = {}

        if (data.reportStudentId) {
          filters.studentId = data.reportStudentId
        }

        if (data.reportOrderTitleId) {
          filters.orderTitleId = data.reportOrderTitleId
        }

        if (data.reportOrderNumber) {
          filters.orderNumber = data.reportOrderNumber
        }

        if (data.reportOrderYear) {
          filters.orderYear = this.reportOrderYear
        }

        if (data.reportOrderDate) {
          filters.orderDate = data.reportOrderDate
        }

        if (data.sectionId) {
          filters.sectionId = data.sectionId
        }

        if (data.studentStatusId) {
          filters.studentStatusId = data.studentStatusId
        }

        if (data.studentLevel) {
          filters.studentLevel = data.studentLevel
        }

        if (data.studyType) {
          filters.studyType = data.studyType
        }

        if (data.registerYearId) {
          filters.registerYearId = data.registerYearId
        }

        if (data.gender) {
          filters.gender = data.gender
        }

        if (data.orderLevel) {
          filters.orderLevel = data.orderLevel
        }

        if (data.graduationDate) {
          filters.studentGraduation = data.graduationDate
        }

        if (this.studySubCategoryId) {
          filters.studySubCategoryId = this.studySubCategoryId
        }

        const queryString = Object.keys(filters)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(filters[key])
          )
          .join('&')

        console.log(queryString)

        if (queryString === '') {
          this.$nuxt.$loading.finish()
          this.$toast.error('يرجى اختيار محددات', {
            duration: 3000,
            position: 'top-center',
          })
        } else {
          this.$axios
            .get(`searchOrder?${queryString}`)
            .then((order) => {
              this.ordersCount = order.data.length
              this.orders = order.data.reverse().map((order) => {
                return {
                  ...order,
                  orderDate: moment(order.orderDate).format('YYYY-MM-DD'),
                  orderLevel: this.convertIntToText(order.orderLevel).text,
                  student: {
                    ...order.student,
                    ExitCauses: order.student.ExitCauses,
                    collegeNumber: order.student.collegeNumber,
                    studentName: order.student.studentName,
                    englishName: order.student.englishName,
                    section: order.student.section.sectionName,
                    studentStatus: order.student.studentStatus.statusName,
                    province:
                      order.student.address !== null
                        ? order.student.address.province.provinceName
                        : '',
                    gender: order.student.gender ? 'ذكر' : 'انثى',
                    mail: order.student.mail,
                    nationality: order.student.nationality,
                    studyType: order.student.studyType ? 'صباحي' : 'مسائي',
                    yearStudy: order.student.yearStudy.year,
                    dob: moment(order.student.dob).format('YYYY-MM-DD'),
                    acceptedType: order.student.acceptedType.acceptedName,
                    schoolName:
                      order.student.studentSchool !== null
                        ? order.student.studentSchool.schoolName
                        : '',
                    average:
                      order.student.studentSchool !== null
                        ? order.student.studentSchool.average
                        : '',
                    graduationDate:
                      order.student.studentSchool !== null
                        ? order.student.studentSchool.graduationDate
                        : '',
                    level:
                      order.student.studentLevel.length > 0
                        ? this.convertIntToText(
                            order.student.studentLevel[0].level
                          ).text
                        : 'لا يوجد',
                    class: order.student.studentLevel.map((std) => {
                      return std.class
                    }),
                  },
                }
              })
              this.reportsDialog = false
              this.$nuxt.$loading.finish()
            })
            .catch((error) => {
              this.$nuxt.$loading.finish()
              console.error(error)
            })
        }
      }
    },

    resetFilterAndTableSettinges() {
      this.headers = this.cloneHeaders
    },

    tableExport(id, name, file) {
      tableToExcel(id, name, file)
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