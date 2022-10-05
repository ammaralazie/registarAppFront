<template>
  <div style="position: relative">
    <v-dialog v-model="createOrderTitleDialog" persistent transition="slide-y-transition" max-width="750px">
      <v-card color="secondary" class="shadow-1 rounded-1">
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h4>انشاء الاوامر الادارية</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="createOrderTitleDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="pa-10">
          <v-form @submit.prevent="createOrderTitle">
            <v-text-field name="title" color="accent" label="عنوان الاوامر الادارية" outlined></v-text-field>

            <v-btn color="success" class="primary--text" block large depressed type="submit">حفظ</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="updateOrdersDialog" persistent transition="slide-y-transition" max-width="750px">
      <v-card color="secondary" class="shadow-1 rounded-1">
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h4>تحديث الاوامر الادارية</h4>
          <v-spacer />
          <v-btn icon color="accent" @click="updateOrdersDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="pa-10">
          <v-form ref="updateOrdersForm" lazy-validation @submit.prevent="updateOrders">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-autocomplete v-model="orderTitleId" :items="selectOrderTitle" item-text="title"
                  item-value="idOrderTitle" item-color="accent" color="accent" outlined label="عنوان الامر" clearable
                  hide-details></v-autocomplete>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field v-model="orderNumber" color="accent" outlined label="رقم الامر الاداري"></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select v-model="orderLevel" :items="orderSelectLevel" item-value="value" item-text="text"
                  color="accent" outlined item-color="accent" label="مرحلة الامر الاداري"></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select v-model="orderYear" :items="orderSelectYear" item-value="idYearStudy" item-text="year"
                  color="accent" outlined item-color="accent" label="سنة الامر الاداري"></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-menu ref="orderDateMenu" v-model="orderDateMenu" :close-on-content-click="false"
                  transition="scale-transition" offset-y min-width="auto">
                  <template #activator="{ on, attrs }">
                    <v-text-field v-model="orderDate" label="تاريخ الامر الاداري" readonly v-bind="attrs" outlined
                      color="accent" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="orderDate" header-color="primary" :active-picker.sync="orderDatePicker" :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  " min="1950-01-01" color="accent" @change="saveUpdateOrderDate"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" :md="orderStatus === 5 ? '6' : '12'" :lg="orderStatus === 5 ? '6' : '12'"
                :xl="orderStatus === 5 ? '6' : '12'">
                <v-select v-model="orderStatus" :items="orderSelectStatus" color="accent" outlined
                  item-text="statusName" item-value="idStudentStatus" item-color="accent" label="حالة الطالب"
                  :rules="rules"></v-select>
              </v-col>

              <v-col v-if="orderStatus === 5" cols="12" :md="orderStatus === 5 ? '6' : '12'"
                :lg="orderStatus === 5 ? '6' : '12'" :xl="orderStatus === 5 ? '6' : '12'">
                <v-select v-model="exitCausesModel" :items="exitCauses" color="accent" outlined item-color="accent"
                  label="سبب الخروج" :rules="rules" class="exitCauses"></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="orderDescription" color="accent" outlined label="نص الامر الاداري"></v-textarea>
              </v-col>
            </v-row>

            <v-btn block color="success" depressed large type="submit">تحديث الامر الاداري</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-toolbar color="primary" class="shadow-navbar rounded-1 mb-5 mt-5">
      <h4>فرز الاوامر الادارية</h4>

      <v-spacer />

      <h4 class="mr-10">عدد الاوامر الادارية: {{ ordersCount }}</h4>
    </v-toolbar>

    <v-card color="secondary" class="shadow-navbar rounded-1 pa-10">
      <v-form ref="reportsForm" v-model="reportsForm" @submit.prevent="createReports">
        <v-row>
          <!-- <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-autocomplete
              name="reportStudentId"
              :items="students"
              color="accent"
              item-text="studentName"
              item-value="idStudent"
              outlined
              label="اسم الطالب"
              clearable
              dense
              hide-details
            ></v-autocomplete>
          </v-col> -->

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-select :items="orderSelectLevel" item-value="value" item-text="text" color="accent" outlined
              item-color="accent" label="مرحلة الامر" name="orderLevel" clearable dense hide-details></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-autocomplete name="reportOrderTitleId" :items="selectOrderTitle" item-text="title"
              item-value="idOrderTitle" item-color="accent" color="accent" outlined label="عنوان الامر" clearable dense
              hide-details></v-autocomplete>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-text-field name="reportOrderNumber" color="accent" outlined label="رقم الامر" clearable dense
              hide-details></v-text-field>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-select v-model="reportOrderYear" name="reportOrderYear" :items="selectOrderYear" item-value="idYearStudy"
              item-text="year" item-color="accent" color="accent" outlined label="سنة الامر" clearable dense
              hide-details></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-menu ref="orderDateMenuModel" v-model="orderDateMenuModel" :close-on-content-click="false"
              transition="scale-transition" offset-y min-width="auto">
              <template #activator="{ on, attrs }">
                <v-text-field v-model="reportOrderDate" name="reportOrderDate" outlined color="accent"
                  label="تاريخ الامر" v-bind="attrs" clearable dense hide-details v-on="on"></v-text-field>
              </template>

              <v-date-picker v-model="reportOrderDate" :active-picker.sync="orderDateActivePicker" :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              " min="1950-01-01" @change="saveOrderDate"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-autocomplete :items="reportSelectSections" item-value="idSection" item-text="sectionName" color="accent"
              outlined item-color="accent" label="القسم" name="sectionId" clearable dense hide-details></v-autocomplete>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
            <v-select :items="reportSelectRegisterYear" item-value="idYearStudy" item-text="year" color="accent"
              outlined item-color="accent" label="سنة القبول" name="registerYearId" clearable dense hide-details>
            </v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-select :items="reportSelectStatus" item-value="idStudentStatus" item-text="statusName" color="accent"
              outlined item-color="accent" label="حالة الطالب" name="studentStatusId" clearable dense hide-details>
            </v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-autocomplete :items="exitCauses" color="accent" outlined item-color="accent" label="سبب الخروج"
              name="exitCauseTitle" clearable dense hide-details></v-autocomplete>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-select outlined color="accent" label="الجنس" :items="selectGender" item-text="text" item-value="value"
              item-color="accent" name="gender" dense hide-details></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-select :items="reportSelectStudyType" item-value="value" item-text="text" color="accent" outlined
              item-color="accent" label="نوع الدراسة" name="studyType" clearable dense hide-details></v-select>
          </v-col>

          <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
            <v-select :items="orderSelectLevel" item-value="value" item-text="text" color="accent" outlined
              item-color="accent" label="مرحلة الطالب" name="studentLevel" clearable dense hide-details></v-select>
          </v-col>

          <v-col cols="12" sm="12" md="4" lg="4" xl="4">
            <v-select :items="reportSelectRegisterYear" item-value="idYearStudy" item-text="year" color="accent"
              outlined item-color="accent" label="سنة التخرج" name="graduationDate" clearable dense hide-details>
            </v-select>
          </v-col>
        </v-row>

        <v-btn type="submit" large color="success" class="mt-5" block depressed>
          <span class="secondary--text">تطبيق الفرز</span>
        </v-btn>
      </v-form>
    </v-card>

    <v-toolbar color="secondary" class="shadow-navbar rounded-1 mb-5 mt-5" style="position: sticky; top: 70px; ">
      <h1>الاوامر الادارية</h1>

      <v-spacer></v-spacer>

      <v-tooltip bottom color="accent" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-btn light color="accent" depressed class="ml-3 primary--text" v-bind="attrs" icon v-on="on"
            @click="createOrderTitleDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span class="primary--text">ادخال عنوان امر اداري جديد</span>
      </v-tooltip>

      <v-tooltip v-if="orders.length > 0" bottom color="accent" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-btn icon color="accent" class="primary--text ml-3" v-bind="attrs" v-on="on"
            @click="tableExport('#orderTable table', 'orders', 'reports.xls')">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span class="primary--text">تصدير الجدول</span>
      </v-tooltip>

      <v-tooltip v-if="orderSelectedIds.length > 0" bottom color="accent" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-btn icon color="accent" class="primary--text ml-3" v-bind="attrs" v-on="on" @click="openUpdateOrders">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span class="primary--text">تعديل</span>
      </v-tooltip>

      <v-tooltip v-if="orderSelectedIds.length > 0" bottom color="accent" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-btn icon color="accent" class="primary--text ml-3" v-bind="attrs" v-on="on" @click="deleteOrders">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span class="primary--text">حذف</span>
      </v-tooltip>
    </v-toolbar>

    <v-card id="tableWrapper" class="shadow-navbar rounded-1">
      <v-data-table v-if="forceUpdate" id="orderTable" :headers="selectedHeader" :items="orders" :search="search"
        :item-class="row_classess" item-key="idAdministrative" :show-select="!isTableSelectDisabled"
        @input="getSelectedIds">
        <template #top>
          <v-toolbar class="shadow-navbar rounded-1 mb-8" color="primary">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="search" append-icon="mdi-magnify" label="بحث في الاوامر الادارية..." single-line
                  hide-details color="accent"></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>

        <template #[`item.exitCauses`]="{ item }">
          <span>{{
          item.student.ExitCauses !== null
          ? item.student.ExitCauses
          : 'لا يوجد'
          }}</span>
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
      x: 0,
      y: 0,
      forceUpdate: true,
      rowItem: {},
      singleSelect: true,
      ordersCount: 0,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
      updateOrdersDialog: false,
      rowContextMenuModel: false,
      createOrderTitleDialog: false,
      orderDateActivePicker: null,
      orderDateMenuModel: false,
      orders: [],
      students: [],
      search: '',
      orderYearText: '',
      userNameText: '',
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
          text: 'عنوان الامر',
          value: 'orderTitle.title',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'رقم الامر',
          value: 'orderNumber',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'تاريخ الامر',
          value: 'orderDate',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'مرحلة الامر',
          value: 'orderLevel',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'سنة الامر',
          value: 'yearStudy.year',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'نص الامر',
          value: 'orderDescription',
          sortable: false,
          align: 'start',
          selected: true,
          width: 500,
        },
        {
          text: 'حالة الطالب',
          value: 'student.studentStatus.statusName',
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
          text: 'بواسطة',
          value: 'user.userName',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'الاسم الانجليزي',
          value: 'student.englishName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'بريد الطالب',
          value: 'student.mail',
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
          text: 'تاريخ الميلاد',
          value: 'student.dob',
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
          text: 'الجنسية',
          value: 'student.nationality',
          width: 200,
          sortable: false,
          selected: false,
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
          text: 'المحافظة',
          value: 'student.province',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المدرسة',
          value: 'student.schoolName',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'المعدل',
          value: 'student.average',
          width: 200,
          sortable: false,
          selected: false,
        },
        {
          text: 'تاريخ التخرج',
          value: 'student.graduationDate',
          width: 200,
          sortable: false,
          selected: false,
        },
      ],

      cloneHeaders: null,

      orderTitle: '',
      orderDescription: '',
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
        {
          text: 'متخرج',
          value: 10,
        },
      ],
      studentIds: [],
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
      oldOrderNumber: '',
      oldOrderYear: '',

      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',
      studySubCategoryId: '',
      orderSelectedIds: [],
      orderTitleId: '',
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
        "تغير قسم"
      ],
      exitCausesModel: '',
      studentSection: '',
      tempFilters: {},
      oldStatus: null,
      createdBy: []
    }
  },

  computed: {
    selectedHeader() {
      return this.headers.filter((h) => h.selected)
    },

    isTableSelectDisabled() {
      const userSection = this.$auth.user.sectionId
      const orderSection = this.studentSection

      if (this.orders) {
        this.orders.forEach(order => {
          let match = false;
          if (this.createdBy.length === 0) {
            this.createdBy.push(order.user.sectionId)
          } else {
            this.createdBy.forEach(item => {
              if (order.user.sectionId === item)
                match = true
            })/* end of forEach */
            if (!match) {
              this.createdBy.push(order.user.sectionId)
            }/* end of if */
          }/* end of if */
        })/* end of forEach */
      }/* end of if */

      const check = this.createdBy.filter(c => {
        console.log("userSection : ", userSection, "c : ", c)
        if (c * 1 === userSection * 1) {
          return c
        } else {
          return null
        }
      })[0]
      if (check === userSection) {
        return userSection !== check
      }
      return userSection !== orderSection
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

    this.orderSelectYear = this.$store.state.yearStudies
    this.selectOrderYear = this.$store.state.yearStudies
    this.reportSelectRegisterYear = this.$store.state.yearStudies

    this.orderSelectStatus = this.$store.state.studentsStatus
    this.reportSelectStatus = this.$store.state.studentsStatus

    this.reportSelectSections = this.$store.state.sections

    this.reportSelectAcceptedType = this.$store.state.acceptedTypes
  },

  methods: {
    getSelectedIds(item) {
      for (let index = 0; index < item.length; index++) {
        this.orderSelectedIds.push(item[index])
      }/* end of forloop */
    },

    cancelSelectedIds() {
      this.orderSelectedIds = []
    },

    row_classess(item) {
      const userSection = this.$auth.user.sectionId
      const orderSection = item.user.sectionId
      if (userSection !== orderSection) {
        return 'dddled_row'
      }
    },

    saveOrderDate(date) {
      this.$refs.orderDateMenuModel.save(date)
    },

    saveUpdateOrderDate(date) {
      this.$refs.orderDateMenu.save(date)
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

    convertTextToInt(text) {
      let str = ''
      if (text === 'المرحلة الاولى') {
        str = 1
      } else if (text === 'المرحلة الثانية') {
        str = 2
      } else if (text === 'المرحلة الثالثة') {
        str = 3
      } else if (text === 'المرحلة الرابعة') {
        str = 4
      } else if (text === 'المرحلة الخامسة') {
        str = 5
      } else {
        str = 10
      }

      return str
    },

    createOrderTitle() {
      const data = Object.fromEntries(new FormData(event.target))
      this.$axios
        .post('addOrderTitle', {
          title: data.title,
          createdBy: this.$auth.user.idUser * 1,
        })
        .then((result) => {
          this.$toast.success('تم حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })
          this.createOrderTitleDialog = false
        })
        .catch((err) => {
          console.error(err)
        })
    },

    createReports(event) {
      if (this.$refs.reportsForm.validate()) {
        const data = Object.fromEntries(new FormData(event.target))
        this.$nuxt.$loading.start()

        this.forceUpdate = false
        this.cancelSelectedIds()
        this.$nextTick().then(() => {
          this.forceUpdate = true
        })

        console.log(this.orderSelectedIds)

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

        if (data.exitCauseTitle) {
          filters.exitCauseTitle = data.exitCauseTitle
        }

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
          localStorage.setItem('queryString', queryString)

          this.tempFilters = queryString

          this.$axios
            .get(`searchOrder?${queryString}`)
            .then((order) => {
              console.log(order)
              this.studentSection =
                order.data.length > 0 ? order.data[0].student.sectionId : null
              this.ordersCount = order.data.length
              this.orders = order.data.reverse().map((order) => {
                return {
                  ...order,
                  orderDate: moment(order.orderDate).format('YYYY-MM-DD'),
                  orderLevel: this.convertIntToText(order.orderLevel).text,
                  student: {
                    collegeNumber: order.student.collegeNumber,
                    ExitCauses:
                      order.student.ExitCauses.length < 1
                        ? 'لا يوجد'
                        : order.student.ExitCauses[0].exitCausesTitle,
                    studentName: order.student.studentName,
                    englishName: order.student.englishName,
                    section: order.student.section.sectionName,
                    studentStatus: order.student.studentStatus,
                    province:
                      order.student.address !== null
                        ? order.student.address.province.provinceName
                        : '',
                    gender: order.student.gender ? 'انثى' : 'ذكر',
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
              this.$nuxt.$loading.finish()
            })
            .catch((error) => {
              console.error(error)
            })
        }
      }
    },

    async deleteOrders() {
      if (confirm('حذف الامر الاداري ؟')) {
        try {
          const data = JSON.stringify(
            this.orderSelectedIds.map((id) => id.idAdministrative)
          )

          const deleteOrder = await this.$axios.delete(
            `administrativeOrders?orderIds=${data}`
          )

          this.$toast.success('تم حذف الامر الاداري بنجاح', {
            duration: 3000,
            position: 'top-center',
          })

          const orders = this.$axios.get(`searchOrder?${this.tempFilters}`)
          console.log(deleteOrder.data)

          this.orders = []
          this.orders = orders.data.map((order) => {
            return {
              ...order,
              orderDate: moment(order.orderDate).format('YYYY-MM-DD'),
              orderLevel: this.convertIntToText(order.orderLevel).text,
              student: {
                collegeNumber: order.student.collegeNumber,
                ExitCauses:
                  order.student.ExitCauses.length < 1
                    ? 'لا يوجد'
                    : order.student.ExitCauses[0].exitCausesTitle,
                studentName: order.student.studentName,
                englishName: order.student.englishName,
                section: order.student.section.sectionName,
                studentStatus: order.student.studentStatus,
                province:
                  order.student.address !== null
                    ? order.student.address.province.provinceName
                    : '',
                gender: order.student.gender ? 'انثى' : 'ذكر',
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
                    ? moment(order.order.student.studentSchool.graduationDate).format('YYYY-MM-DD')
                    : '',
                level:
                  order.student.studentLevel.length > 0
                    ? this.convertIntToText(order.student.studentLevel[0].level)
                      .text
                    : 'لا يوجد',
                class: order.student.studentLevel.map((std) => {
                  return std.class
                }),
              },
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    },

    openUpdateOrders() {
      this.updateOrdersDialog = true
      this.orderTitleId = this.orderSelectedIds[0].orderTitleId
      this.orderNumber = this.orderSelectedIds[0].orderNumber
      this.orderDescription = this.orderSelectedIds[0].orderDescription
      this.orderYear = this.orderSelectedIds[0].orderYear
      this.orderLevel = this.convertTextToInt(
        this.orderSelectedIds[0].orderLevel
      )
      this.orderDate = this.orderSelectedIds[0].orderDate
      this.orderStatus =
        this.orderSelectedIds[0].student.studentStatus.idStudentStatus
    },

    async updateOrders() {
      const selectedOrders = this.orderSelectedIds
      const status = selectedOrders[0].student.studentStatus.idStudentStatus

      const data = {
        orderTitleId: this.orderTitleId,
        orderNumber: this.orderNumber,
        orderDescription: this.orderDescription,
        orderYear: this.orderYear,
        orderLevel: this.orderLevel,
        orderDate: new Date(this.orderDate),
      }

      const payload = {
        orderIds: selectedOrders,
        updatedData: data,
        studentStatusId: this.orderStatus,
        createdBy: this.$auth.user.idUser,
        isExit: 3,
        exitCauses: this.exitCausesModel,
      }

      if (status === 5 && this.orderStatus === 5) {
        payload.isExit = 2
      } else if (status === 5 && this.orderStatus !== 5) {
        payload.isExit = 1
      } else {
        payload.isExit = 3
      }

      if (this.$refs.updateOrdersForm.validate()) {
        try {
          const update = await this.$axios.put('updateOrdersByIds', payload)

          this.$toast.success('تم حفظ المعلومات بنجاح', {
            duration: 3000,
            position: 'top-center',
          })

          this.updateOrdersDialog = false
          this.orders = []
          this.$refs.reportsForm.reset()
          this.forceUpdate = false
          this.cancelSelectedIds()
          this.$nextTick().then(() => {
            this.forceUpdate = true
          })
          console.log('🚀 ~ file: index.vue ~ updateOrders ~ update', update)
        } catch (error) {
          console.error(error)
          this.$toast.error('حدث خطأ في حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })
        }
      }
    },

    tableExport(id, name, file) {
      tableToExcel(id, name, file)
    },
  },
}
</script>

<style lang="scss">
.disabled_row {
  pointer-events: none !important;

  * {
    color: #898989 !important;
  }
}
</style>
