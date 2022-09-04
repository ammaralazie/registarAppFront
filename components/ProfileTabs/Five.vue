<template>
  <div>
    <v-dialog
      v-model="openEditDialog"
      persistent
      transition="slide-y-transition"
      max-width="750px"
    >
      <v-card class="shadow-1 rounded-1" color="secondary">
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h4>تحديث الامر الاداري</h4>

          <v-spacer />

          <v-btn icon color="accent" @click="openEditDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pa-5">
          <v-form ref="editForm" lazy-validation @submit.prevent="updateOrder">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-autocomplete
                  v-model="editData.title"
                  :items="orderTitles"
                  color="accent"
                  item-color="accent"
                  item-value="idOrderTitle"
                  item-text="title"
                  outlined
                  label="عنوان الامر الاداري"
                  :rules="rules"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="editData.number"
                  color="accent"
                  outlined
                  label="رقم الامر الاداري"
                  :rules="rules"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <v-select
                  v-model="editData.level"
                  :items="levels"
                  color="accent"
                  item-color="accent"
                  outlined
                  label="مرحلة الامر الاداري"
                  :rules="rules"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <v-select
                  v-model="editData.year"
                  :items="yearStudies"
                  color="accent"
                  item-color="accent"
                  item-value="idYearStudy"
                  item-text="year"
                  outlined
                  label="سنة الامر الاداري"
                  :rules="rules"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <v-menu
                  ref="editDataMenu"
                  v-model="editData.menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="editData.date"
                      label="تاريخ الامر الاداري"
                      readonly
                      v-bind="attrs"
                      outlined
                      color="accent"
                      clearable
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editData.date"
                    :active-picker.sync="editData.activePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col
                cols="12"
                xs="12"
                sm="12"
                :md="editData.status === 5 ? '6' : '12'"
                :lg="editData.status === 5 ? '6' : '12'"
                :xl="editData.status === 5 ? '6' : '12'"
              >
                <v-select
                  v-model="editData.status"
                  :items="studentsStatus"
                  color="accent"
                  item-color="accent"
                  item-value="idStudentStatus"
                  item-text="statusName"
                  outlined
                  label="حالة الطالب"
                  :rules="rules"
                  clearable
                ></v-select>
              </v-col>

              <v-col
                v-if="editData.status === 5"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
                xl="6"
              >
                <v-select
                  v-model="editData.exit"
                  :items="exitCauses"
                  color="accent"
                  item-color="accent"
                  outlined
                  label="اسباب الخروج"
                  :rules="rules"
                  clearable
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="editData.description"
                  color="accent"
                  outlined
                  label="نص الامر الاداري"
                  :rules="rules"
                  clearable
                ></v-textarea>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              color="success"
              class="primary--text"
              block
              large
              depressed
            >
              حفظ الامر الاداري
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-data-table :items="studentOrders" :headers="headers">
      <template #top>
        <v-toolbar color="primary" class="shadow-1 rounded-1">
          <h1>الاوامر الامر الاداري</h1>
          <v-spacer />
          <ProfileTabsDialogsCreate
            v-if="!row_classess"
            :data="{
              orderTitles,
              yearStudies,
              studentsStatus,
              levels,
              exitCauses,
              studentId,
            }"
            @saved="initOnReady"
          />
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{ item, index }">
        <v-btn
          icon
          color="warning"
          depressed
          :disabled="row_classess"
          @click="editStudentOrder(item)"
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>

        <v-btn
          icon
          color="error"
          depressed
          :disabled="row_classess"
          @click="deleteOrder(item, index)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
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
      studentOrders: [],
      yearStudies: [],
      studentsStatus: [],
      orderTitles: [],

      openCreateDialog: false,
      openEditDialog: false,
      idAdministrative: null,
      studentExitCauses: [],

      editData: {
        title: '',
        number: '',
        year: '',
        level: '',
        status: '',
        exit: '',
        description: '',
        activePicker: null,
        date: null,
        menu: false,
        hideStatus: false,
        hideExit: true,
      },

      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],

      levels: [
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

      headers: [
        {
          text: '#',
          value: 'idAdministrative',
          sortable: false,
          align: 'start',
          selected: true,
          width: 50,
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
          text: 'سنة الامر',
          value: 'yearStudy.year',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'تاريخ الامر',
          value: 'orderDate',
          sortable: true,
          align: 'start',
          selected: true,
          width: 200,
        },
        {
          text: 'مرحلة الامر',
          value: 'orderLevel.text',
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
          text: 'سبب الخروج',
          value: 'exitCauses',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
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
          text: 'الاجرائات',
          value: 'actions',
          sortable: false,
          align: 'start',
          selected: true,
          width: 200,
        },
      ],
      studentSection: '',
    }
  },

  computed: {
    row_classess() {
      const userSection = this.$auth.user.sectionId
      const orderSection = this.studentSection
      console.log(orderSection)
      return userSection !== orderSection
    },
  },

  created() {
    this.initOnReady()
    this.$nuxt.$on('adminOrderAdded', () => {
      this.initOnReady()
    })
  },

  methods: {
    save(date) {
      this.$refs.editDataMenu.save(date)
    },

    editStudentOrder(item) {
      const userSection = this.$auth.user.sectionId
      const orderSection = item.user.sectionId
      this.idAdministrative = item.idAdministrative

      console.log(item)

      if (userSection === orderSection) {
        this.openEditDialog = true
        this.editData = {
          ...item,
          title: item.orderTitle.idOrderTitle,
          number: item.orderNumber,
          year: item.orderYear,
          level: item.orderLevel,
          status: item.student.studentStatus.idStudentStatus,
          exit:
            item.student.ExitCauses.length < 1
              ? ''
              : item.student.ExitCauses[item.student.ExitCauses.length - 1]
                  .exitCausesTitle,
          description: item.orderDescription,
          date: item.orderDate,
        }
      } else {
        this.$toast.error('لا تملك الصلاحيات لتعديل هذا الامر الاداري', {
          duration: 5000,
          position: 'top-center',
        })
      }
    },

    updateOrder() {
      const data = {
        orderTitleId: this.editData.title,
        orderNumber: this.editData.number,
        orderDescription: this.editData.description,
        orderYear: this.editData.year,
        orderLevel:
          typeof this.editData.level === 'object'
            ? this.editData.level.value
            : this.editData.level,
        studentId: this.studentId,
        orderDate: this.editData.date,
        createdBy: this.editData.createdBy,
        studentStatusId: this.editData.status,
      }

      this.$axios
        .put(`administrativeOrder/${this.idAdministrative}`, data)
        .then((result) => {
          this.openEditDialog = false
          this.$toast.success('تم حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })

          if (this.editData.status === 5) {
            const exitinfo = {
              exitCausesTitle: this.exitCausesModel,
              studentId: this.studentId,
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
                  exitCausesTitle: this.editData.exit,
                  studentId: this.studentId,
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

          this.initOnReady()
        })
        .catch((error) => {
          console.error(error.response)
        })
    },

    deleteOrder(item, index) {
      const userSection = this.$auth.user.sectionId
      const orderSection = item.user.sectionId

      if (userSection === orderSection) {
        if (confirm('هل تريد حذف الامر الاداري ؟')) {
          this.$axios
            .delete(`administrativeOrder/${item.idAdministrative}`)
            .then(() => {
              this.$toast.success('تم حذف الامر الاداري', {
                duration: 3000,
                position: 'top-center',
              })

              this.studentOrders.splice(index, 1)
            })
        }
      } else {
        this.$toast.error('لا تملك الصلاحيات لحذف هذا الامر الاداري', {
          duration: 5000,
          position: 'top-center',
        })
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

    async initOnReady() {
      /*
        1: get study years
        2: get student status
        3: get order titles
        4: get admin orders by student id
      */

      try {
        const students = await this.$axios.get(`student/${this.studentId}`)
        this.studentSection = students.data.sectionId

        const yearStudy = await this.$axios.get('yearStudies')
        this.yearStudies = yearStudy.data

        const studentStatus = await this.$axios.get('studentsStatus')
        this.studentsStatus = studentStatus.data

        const orderTitle = await this.$axios.get('orderTitles')
        this.orderTitles = orderTitle.data.filter((order) => {
          return (
            order.idOrderTitle !== 52 &&
            order.idOrderTitle !== 53 &&
            order.idOrderTitle !== 54 &&
            order.idOrderTitle !== 21 &&
            order.idOrderTitle !== 22 &&
            order.idOrderTitle !== 23 &&
            order.idOrderTitle !== 447
          )
        })

        const studentOrder = await this.$axios.get(
          `studentOrders/${this.studentId}`
        )

        if (studentOrder.data.length > 0) {
          this.studentOrders = studentOrder.data
            .map((Student) => {
              console.log(Student);
              return {
                ...Student,
                orderDate: moment(Student.orderDate).format('YYYY-MM-DD'),
                orderLevel: this.convertIntToText(Student.orderLevel),
                exitCauses: studentOrder.data[0].student.ExitCauses.length > 0 ? studentOrder.data[0].student.ExitCauses[0].exitCausesTitle : 'لا يوجد',
              }
            })
            .sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))
          this.studentExitCauses = studentOrder.data[0].student.ExitCauses
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>