<template>
  <v-app>
    <v-dialog v-model="appInfoDialog" class="shadow-1 rounded-1" width="650px" transition="slide-y-transition">
      <v-card color="secondary" class="shadow-1 rounded-1 accent--text">
        <v-toolbar class="shadow-1 rounded-1" color="primary">
          <span>معلومات البرنامج</span>
          <v-spacer></v-spacer>
          <v-btn icon color="accent" @click="appInfoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="pa-10">
          <v-alert border="left" colored-border type="info" outlined>
            <h3>برنامج تسجيل الطلاب و ادارة الاوامر الادارية - كلية دجلة (قسم تكنلوجيا المعلومات)</h3>
          </v-alert>

          <v-divider class="mt-5 mb-5" />

          <ul style="direction: ltr !important">
            <h1>Developers</h1>
            <li v-for="info in appInfo" :key="info.value">
              <span>{{ info.text }} : {{ info.value }}</span>
            </li>
          </ul>
        </div>
      </v-card>
    </v-dialog>

    <v-navigation-drawer app right :mini-variant="variant" permanent class="elevation-15" mini-variant-width="80"
      color="secondary">
      <SideBarLogo :show-title="!variant" />
      <v-divider />
      <SideBarList :show-title="!variant" />
    </v-navigation-drawer>

    <v-app-bar app color="secondary" class="shadow-navbar">
      <v-app-bar-nav-icon @click="variant = !variant"></v-app-bar-nav-icon>
      <v-toolbar-title v-show="variant">برنامج التسجيل</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="$auth.loggedIn" class="pa-0" transition="slide-y-transition">
        <template #activator="{ on, attrs }">
          <v-list dense nav elevation="0" class="pa-0">
            <v-list-item class="pa-0" v-bind="attrs" v-on="on">
              <v-list-item-avatar>
                <v-icon>mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ $auth.user.userName }}</v-list-item-title>
                <v-list-item-subtitle>{{ section }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>

        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-title>تسجيل الخروج</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app absolute inset color="secondary" elevation="2">
      <v-btn text color="accent" @click="appInfoDialog = true">معلومات البرنامج</v-btn>
      <v-spacer></v-spacer>
      <span>الاصدار: {{ version }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import * as cookie from "vue-cookies"
export default {
  data() {
    return {
      version: '1.1.0',
      variant: true,
      appInfoDialog: false,
      section: null,
      appInfo: [
        {
          text: 'Front End',
          value: 'Tariq Ali',
        },
        {
          text: 'Back End',
          value: 'Mustafa Mohammed Ameen',
        },
      ],
    }
  },
  mounted() {
    this.$auth.$storage.syncUniversal(
      'user',
      this.$auth.$storage.getUniversal('user')
    )

    this.$store.dispatch(
      'saveLastStudentId',
      localStorage.getItem('lastStudentRegistered') || null
    )

    this.getSections()
    this.setRoleIdUserId()
  },

  methods: {
    setRoleIdUserId() {
      if (!this.$axios.defaults.headers.common.roleid) {
        delete this.$axios.defaults.headers.common.roleid
        delete this.$axios.defaults.headers.common.iduser
        if (cookie.get("auth.user")) {
          this.$axios.defaults.headers.common.roleid = cookie.get("auth.user").roleId
          this.$axios.defaults.headers.common.iduser = cookie.get("auth.user").idUser
        } else {
          this.$router.push("/login")
        }/* end of if */
        console.log("you dont have any role id in headers", this.$axios.defaults.headers.common)
      }/* end of if */
    },
    getSections() {
      const sectionId = JSON.parse(localStorage.getItem('auth.user')).sectionId
      this.$axios.get(`section/${sectionId}`).then((result) => {
        this.section = result.data.sectionName
      })
    },

    logout() {
      this.$auth.logout()
      this.$auth.$storage.removeUniversal('user')
      this.$auth.$storage.removeState('user')
      this.$auth.$storage.removeLocalStorage('user')
      this.$auth.$storage.removeCookie('user', true)
    }
  },
}
</script>

<style lang="scss">
</style>