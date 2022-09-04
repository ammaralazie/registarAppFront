<template>
  <div>
    <v-btn color="accent" icon @click="dialog = true">
      <v-icon>mdi-sitemap</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      persistent
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card class="shadow-1 rounded-1" color="secondary">
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h4>اضافة امر اداري</h4>

          <v-spacer />

          <v-btn icon color="accent" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pa-5">
          <v-form
            ref="adminOrderForm"
            v-model="adminOrderForm"
            lazy-validation
            @submit.prevent="createAdminOrders"
          >
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <v-autocomplete
                  v-model="orderTitle"
                  :items="computedOrderSelectTitle"
                  item-value="idOrderTitle"
                  item-text="title"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="عنوان الامر الاداري"
                  :rules="rules"
                  return-object
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="orderNumber"
                  color="accent"
                  outlined
                  label="رقم الامر الاداري"
                  :rules="rules"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                xs="12"
                sm="12"
                :md="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :lg="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :xl="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
              >
                <v-select
                  v-model="orderLevel"
                  :items="orderSelectLevel"
                  item-value="value"
                  item-text="text"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="مرحلة الامر الاداري"
                  :rules="rules"
                  return-object
                ></v-select>
              </v-col>

              <v-col
                v-if="isLevelUpApi || isGraduationApi"
                cols="12"
                xs="12"
                sm="12"
                :md="isLevelUpApi ? '6' : '6'"
                :lg="isLevelUpApi ? '6' : '6'"
                :xl="isLevelUpApi ? '6' : '6'"
              >
                <v-select
                  v-model="orderNewLevel"
                  :items="orderSelectLevel"
                  item-value="value"
                  item-text="text"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="مرحلة الطالب"
                  :rules="rules"
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                xs="12"
                sm="12"
                :md="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :lg="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :xl="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
              >
                <v-select
                  v-model="orderYear"
                  :items="orderSelectYear"
                  item-value="idYearStudy"
                  item-text="year"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="سنة الامر الاداري"
                  :rules="rules"
                  return-object
                ></v-select>
              </v-col>

              <v-col
                v-if="isGraduationApi"
                cols="12"
                xs="12"
                sm="12"
                :md="isGraduationApi ? '6' : '4'"
                :lg="isGraduationApi ? '6' : '4'"
                :xl="isGraduationApi ? '6' : '4'"
              >
                <v-select
                  v-model="graduationDate"
                  :items="orderSelectYear"
                  item-value="idYearStudy"
                  item-text="year"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="سنة التخرج"
                  :rules="rules"
                  return-object
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                xs="12"
                sm="12"
                :md="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :lg="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
                :xl="isLevelUpApi ? '6' : '4' || isGraduationApi ? '6' : '4'"
              >
                <v-menu
                  ref="orderDateMenu"
                  v-model="orderDateMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="orderDate"
                      label="تاريخ الامر الاداري"
                      readonly
                      v-bind="attrs"
                      outlined
                      color="accent"
                      :rules="rules"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="orderDate"
                    header-color="primary"
                    :active-picker.sync="orderDatePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    color="accent"
                    @change="saveOrderDate"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col
                v-if="!isLevelUpApi && !isGraduationApi"
                cols="12"
                sm="12"
                :md="orderStatus === 5 ? '6' : '12'"
                :lg="orderStatus === 5 ? '6' : '12'"
                :xl="orderStatus === 5 ? '6' : '12'"
              >
                <v-select
                  v-model="orderStatus"
                  :items="orderSelectStatus"
                  color="accent"
                  outlined
                  item-text="statusName"
                  item-value="idStudentStatus"
                  item-color="accent"
                  label="حالة الطالب"
                  :rules="rules"
                ></v-select>
              </v-col>

              <v-col
                v-if="orderStatus === 5 && !isLevelUpApi && !isGraduationApi"
                cols="12"
                :md="orderStatus === 5 ? '6' : '12'"
                :lg="orderStatus === 5 ? '6' : '12'"
                :xl="orderStatus === 5 ? '6' : '12'"
              >
                <v-select
                  v-model="exitCausesModel"
                  :items="exitCauses"
                  color="accent"
                  outlined
                  item-color="accent"
                  label="سبب الخروج"
                  :rules="rules"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="orderDescription"
                  color="accent"
                  outlined
                  label="نص الامر الاداري"
                  :rules="rules"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-btn
              block
              color="success"
              depressed
              large
              :disabled="!adminOrderForm"
              type="submit"
              class="primary--text"
            >
              حفظ المعلومات
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      studentExitCauses: [],
      studentsCount: 0,
      search: '',
      loading: true,
      isLevelUpApi: false,
      isGraduationApi: false,
      graduationDate: '',
      searchStudentId: '',
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
      students: [],
      searchStudent: [],
      tableLoading: true,
      isStudentSelected: false,
      studentSelected: [],

      // reports
      studentReportsDialog: false,

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
      // reports

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
      exitCausesModel: null,
      cloneHeaders: null,
      selectCategory: [],
      selectSubCategory: [],
      studentCategory: [],
      studentSubCategory: '',
      isSelectCategory: false,
      studySubCategoryId: '',
      studyYears: [],
      showSelectCheckBox: true,
    }
  },

  computed: {
    computedOrderSelectTitle() {
      let filterd
      if (this.isLevelUpApi) {
        filterd = this.orderSelectTitle.filter(function (order) {
          if (
            order.idOrderTitle === 52 ||
            order.idOrderTitle === 53 ||
            order.idOrderTitle === 54
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
            order.idOrderTitle === 23 ||
            order.idOrderTitle === 447
          ) {
            return true
          }

          return false
        })
        return filterd
      } else {
        filterd = this.orderSelectTitle.filter((o) => {
          return (
            o.idOrderTitle !== 52 &&
            o.idOrderTitle !== 53 &&
            o.idOrderTitle !== 54 &&
            o.idOrderTitle !== 21 &&
            o.idOrderTitle !== 22 &&
            o.idOrderTitle !== 23 &&
            o.idOrderTitle !== 447
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
    this.fetchOrders()

    this.$axios.get('orderTitles').then((orders) => {
      this.orderSelectTitle = orders.data
    })

    this.$axios.get('yearStudies').then((years) => {
      this.orderSelectYear = years.data
      const currentYear = years.data.filter((year) => year.currentYear === true)
      this.orderYear = currentYear[0]

      this.reportSelectRegisterYear = years.data
      this.studyYears = years.data
    })

    this.$axios.get('sections').then((section) => {
      this.reportSelectSections = section.data
    })

    this.$axios.get('studentsStatus').then((status) => {
      this.reportSelectStatus = status.data
      this.orderSelectStatus = status.data
    })

    this.$axios.get('acceptedTypes').then((accepted) => {
      this.reportSelectAcceptedType = accepted.data
    })

    this.orderDate = moment(new Date().toLocaleString()).format('YYYY-MM-DD')
  },

  methods: {
    fetchOrders() {
      this.$axios.get(`studentOrders/${this.data.studentId}`).then((order) => {
        this.studentExitCauses = order.data.length > 0 ? order.data[0].student.ExitCauses : []

        this.orders = order.data.map((order) => {
          return {
            ...order,
            orderDate: moment(order.orderDate).format('YYYY-MM-DD'),
            orderLevel: this.convertIntToText(order.orderLevel).text,
            student: {
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
              gender: order.student.gender ? 'انثى' : 'ذكر',
              mail: order.student.mail,
              nationality: order.student.nationality,
              studyType: order.student.studyType ? 'صباحي' : 'مسائي',
              yearStudy: order.student.yearStudy.year,
              dob: order.student.dob,
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
                  ? this.convertIntToText(order.student.studentLevel[0].level)
                      .text
                  : '',
              class: order.student.studentLevel.map((std) => {
                return std.class
              }),
            },
          }
        })
      })
    },

    openLevelUpDialog() {
      this.orderNewLevel = this.studentSelected[0].level[0].value
    },

    row_classess(item) {
      const userSection = this.$auth.user.sectionId
      const studentSection = item.sectionId
      if (userSection !== studentSection) {
        return 'disabled_row_students'
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

    createAdminOrders() {
      if (this.$refs.adminOrderForm.validate()) {
        this.$toast.show('جاري تعميم الامر الاداري', {
          duration: 3000,
          position: 'top-center',
        })

        const info = {
          orderTitleId: this.orderTitle.idOrderTitle,
          orderNumber: this.orderNumber,
          orderDescription: this.orderDescription,
          orderYear: this.orderYear.idYearStudy * 1,
          orderLevel: this.orderLevel.value,
          studentId: this.data.studentId * 1,
          studentStatusId: this.orderStatus * 1,
          orderDate: new Date(
            moment(this.orderDate).format('YYYY-MM-DD hh:mm:ss')
          ),
          createdBy: this.$auth.user.idUser,
        }
        this.$axios
          .post('addAdministrativeOrder', info)
          .then(() => {
            this.$toast.success('تم تعميم الامر الاداري', {
              duration: 3000,
              position: 'top-center',
            })

            this.$nuxt.$emit('adminOrderAdded')
            this.dialog = false
            this.isLevelUpApi = false
            this.isGraduationApi = false

            if (info.studentStatusId === 5) {
              const exitinfo = {
                exitCausesTitle: this.exitCausesModel,
                studentId: this.data.studentId,
                createdBy: this.$auth.user.idUser,
              }

              if (this.studentExitCauses.length < 1) {
                this.$axios
                  .post('addExitCauses', exitinfo)
                  .then((result) => {
                    console.log(result)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              } else {
                this.$axios
                  .put(`exitCauses/${this.studentExitCauses[0].idExitCauses}`, {
                    exitCausesTitle: this.exitCausesModel,
                    studentId: this.data.studentId,
                    createdBy: this.$auth.user.idUser,
                  })
                  .then((result) => {
                    console.log(result)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            }
          })
          .catch((err) => {
            this.$toast.error('حدث خطأ في تعميم الامر الاداري', {
              duration: 15000,
              position: 'top-center',
            })
            this.dialog = false
            this.isLevelUpApi = false
            console.error(err.response)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>