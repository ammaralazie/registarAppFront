<template>
  <div class="login-page">
    <div class="form-side">
      <div class="form-side-logo">
        <img src="~/static/icon.png" />
      </div>
      <v-form
        ref="login"
        v-model="loginModel"
        lazy-validation
        @submit.prevent="login"
      >
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="loginData.userName"
              label="اسم المستخدم"
              outlined
              color="accent"
              prepend-inner-icon="mdi-account"
              :rules="rules"
              background-color="primary"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="loginData.password"
              label="كلمة المرور"
              outlined
              color="accent"
              prepend-inner-icon="mdi-lock"
              append-icon="mdi-eye"
              background-color="primary"
              :type="showPassword ? 'text' : 'password'"
              :rules="rules"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          large
          block
          color="accent"
          depressed
          class="primary--text"
          type="submit"
        >
          تسجيل الدخول
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      showPassword: false,
      loginModel: false,
      rules: [(v) => !!v || 'لا يمكن ترك الحقل فارغ'],
      loginData: {
        userName: '',
        password: '',
      },
    }
  },

  methods: {
    parseToken(token) {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    },


    async login() {
      const showMessage = this.$toast.show('جاري تسجيل الدخول...', {
        position: 'top-center',
      })
      
      try {
        const user = await this.$auth.loginWith('local', {
          data: this.loginData,
        })

        this.$auth.setUser(this.parseToken(user.data.token))
        this.$auth.strategy.token.set(user.data.token)
        this.$auth.$storage.setUniversal('user', this.parseToken(user.data.token))

        showMessage.goAway()

        this.$toast.success('تم تسجيل الدخول', {
          duration: 3000,
          position: 'top-center',
        })
      } catch (e) {
        showMessage.goAway()
        this.$toast.error('خطأ في تسجيل الدخول, تحقق من صحة المعلومات', {
          duration: 3000,
          position: 'top-center',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: 100px;
    margin: 20px auto;
  }

  .form-side {
    width: 500px;
  }
}
</style>