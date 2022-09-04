<template>
  <div class="users-page">
    <v-alert
      v-if="$auth.user.roleId !== 2"
      type="warning"
      dismissible
      border="left"
      colored-border
      class="shadow-1 rounded-1"
    >
      لا تملك الصلاحيات الكافية لتعديل المستخدمين
    </v-alert>

    <v-dialog v-model="updateDialog" persistent max-width="750px">
      <v-card color="primary" class="shadow-1 rounded-1">
        <v-toolbar color="secondary" class="shadow-1 rounded-1">
          <h4>تعديل حساب المستخدم</h4>

          <v-spacer></v-spacer>

          <v-btn color="accent" icon @click="updateDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pa-10">
          <v-form ref="isAuth" @submit.prevent="updateUser">
            <v-row>
              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="updateUserName"
                  name="userName"
                  color="accent"
                  label="اسم المستخدم"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="updatePassword"
                  name="password"
                  color="accent"
                  label="كلمة المرور"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  :value="$auth.user.password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select
                  v-model="updateRole"
                  color="accent"
                  :items="roles"
                  item-color="accent"
                  item-text="roleName"
                  item-value="idRole"
                  label="الصلاحيات"
                  outlined
                  return-object
                ></v-select>
              </v-col>

              <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
                <v-select
                  v-model="updateSection"
                  color="accent"
                  :items="sections"
                  item-color="accent"
                  item-text="sectionName"
                  item-value="idSection"
                  label="القسم"
                  outlined
                  return-object
                ></v-select>
              </v-col>
            </v-row>

            <v-btn type="submit" color="success" block large>
              تعديل الحساب
            </v-btn>
          </v-form>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeleteDialog" persistent max-width="430px">
      <v-card class="shadow-1 rounded-1" color="primary">
        <v-container class="pa-10">
          <div class="mb-5">
            <h2>حذف حساب المستخدم ؟</h2>
          </div>
          <v-divider />
          <div class="mt-5">
            <v-btn
              large
              color="success"
              depressed
              class="ml-5"
              @click="deleteUser()"
            >
              حذف المستخدم
            </v-btn>

            <v-btn
              large
              color="warning"
              depressed
              @click="
                confirmDelete = false
                confirmDeleteDialog = false
              "
            >
              الغاء
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </v-dialog>

    <v-toolbar color="secondary" class="shadow-navbar rounded-1 mb-5 mt-5">
      <h1>المستخدمين</h1>
    </v-toolbar>

    <v-card id="tableWrapper" class="shadow-navbar rounded-1">
        <v-data-table :items="users" :headers="headers">
          <template #[`item.roleId`]="{ item }">
            {{ userRole(item) }}
          </template>

          <template #[`item.sectionId`]="{ item }">
            {{ userSection(item) }}
          </template>

          <template #[`item.createdAt`]="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>

          <template #[`item.actions`]="{ item }">
            <v-btn
              icon
              color="warning"
              :disabled="$auth.user.roleId !== 2"
              @click="getUserInfo(item)"
            >
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-btn>

            <v-btn
              icon
              color="error"
              :disabled="$auth.user.roleId !== 2"
              @click="openDeleteDialog(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      users: [],
      updateDialog: false,
      showPassword: false,

      updateUserName: '',
      updatePassword: '',
      updateSection: null,
      updateRole: null,
      updateUserId: '',

      confirmDeleteDialog: false,
      headers: [
        {
          text: '#',
          align: 'start',
          sortable: false,
          value: 'idUser',
        },
        {
          text: 'اسم المستخدم',
          align: 'start',
          sortable: false,
          value: 'userName',
        },
        {
          text: 'القسم',
          align: 'start',
          sortable: false,
          value: 'sectionId',
        },
        {
          text: 'الصلاحيات',
          align: 'start',
          sortable: false,
          value: 'roleId',
        },
        {
          text: 'تاريخ الانشاء',
          align: 'start',
          sortable: false,
          value: 'createdAt',
        },
        {
          text: 'الاجرائات',
          align: 'start',
          sortable: false,
          value: 'actions',
        },
      ],
      roles: [],
      sections: [],
    }
  },

  mounted() {
    this.getUsers()
    this.getRoles()
    this.getSections()
  },

  methods: {
    async getUsers() {
      try {
        const users = await this.$axios.get('users')
        this.users = users.data
      } catch (e) {
        console.error(e)
      }
    },

    async getRoles() {
      try {
        const roles = await this.$axios.get('roles')
        this.roles = roles.data
      } catch (e) {
        console.error(e)
      }
    },

    async getSections() {
      try {
        const sections = await this.$axios.get('sections')
        this.sections = sections.data
      } catch (e) {
        console.error(e)
      }
    },

    userRole(item) {
      if (this.roles.length > 0) {
        const { roleId } = item
        const roles = this.roles.filter((role) => {
          return role.idRole === roleId
        })

        return roles[0].roleName
      }
    },

    userSection(item) {
      if (this.sections.length > 0) {
        const { sectionId } = item
        const sections = this.sections.filter((section) => {
          return section.idSection === sectionId
        })

        return sections[0].sectionName
      }
    },

    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },

    getUserInfo(item) {
      const row = item
      const section = this.sections.filter((s) => s.idSection === row.sectionId)
      const role = this.roles.filter((r) => r.idRole === row.roleId)
      this.updateUserName = row.userName
      this.updatePassword = row.password
      this.updateSection = section[0]
      this.updateRole = role[0]
      this.updateUserId = item.idUser

      this.updateDialog = true
    },

    updateUser() {
      const userData = {
        userName: this.updateUserName,
        password: this.updatePassword,
        roleId: this.updateRole.idRole,
        sectionId: this.updateSection.idSection,
      }

      this.$axios
        .put(`user/${this.updateUserId}`, userData)
        .then((result) => {
          this.$toast.success('تم تحديث المعلومات بنجاح', {
            duration: 3000,
            position: 'top-center',
          })

          this.updateDialog = false
          this.getUsers()
        })
        .catch((err) => {
          this.$toast.error('حدث خطأ في حفظ المعلومات', {
            duration: 3000,
            position: 'top-center',
          })

          console.error(err)
        })
    },

    openDeleteDialog(item) {
      this.confirmDeleteDialog = true
      this.updateUserId = item.idUser
    },

    deleteUser() {
      const id = this.updateUserId
      this.$axios
        .delete(`user/${id}`)
        .then((result) => {
          this.$toast.success('تم حذف المستخدم بنجاح', {
            duration: 3000,
            position: 'top-center',
          })

          this.confirmDeleteDialog = false
          this.getUsers()
        })
        .catch((err) => {
          this.$toast.error('حدث خطأ في حذف المستخدم', {
            duration: 3000,
            position: 'top-center',
          })

          this.confirmDeleteDialog = false
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>