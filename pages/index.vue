<template>
  <div class="home-page">
    <v-row class="mt-5">
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card class="shadow-navbar rounded-1 pa-5" @click="$router.push('/orders')">
          <v-row>
            <v-col cols="3">
              <v-icon size="70" class="mb-3 mt-3">la-sitemap</v-icon>
            </v-col>
            <v-col>
              <h3 class="mb-3 mt-3">الاوامر الادارية</h3>
              <h1 class="mb-3 mt-3">{{ ordersLength }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card class="shadow-navbar rounded-1 pa-5" @click="$router.push('/students')">
          <v-row>
            <v-col cols="3">
              <v-icon size="70" class="mb-3 mt-3">la-users</v-icon>
            </v-col>
            <v-col>
              <h3 class="mb-3 mt-3">الطلاب</h3>
              <h1 class="mb-3 mt-3">{{ studentsLength }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card class="shadow-navbar rounded-1 pa-5" @click="$router.push('/users')">
          <v-row>
            <v-col cols="3">
              <v-icon size="70" class="mb-3 mt-3">la-users-cog</v-icon>
            </v-col>
            <v-col>
              <h3 class="mb-3 mt-3">المستخدمين</h3>
              <h1 class="mb-3 mt-3">{{ usersLength }}</h1>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-card id="tableWrapper" class="shadow-navbar rounded-1 mt-10">
      <v-data-table
        id="orderTable"
        :headers="headers"
        :items="lastOrders"
        :search="search"
      >
        <template #top>
          <v-toolbar class="shadow-navbar rounded-1 mb-8" color="primary">
            <h4>اخر الاوامر الادارية</h4>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="بحث في الاوامر الادارية..."
              single-line
              hide-details
              color="accent"
            ></v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordersLength: null,
      studentsLength: null,
      usersLength: null,
      lastOrders: [],
      search: '',
      headers: [
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
          width: 200,
        },
      ],
    }
  },

  mounted() {
    this.$axios.get('allCount').then((result) => {
      console.log("result.data : ",result.data)
      this.studentsLength = result.data.studentsCount
      if (result.data.ordersCount) {
        this.ordersLength = result.data.ordersCount
      } else {
        this.$axios.get('administrativeOrdersCount').then((result) => {
          this.ordersLength = result.data
        })
      }/* end of if */
    }).catch((error) =>console.log("error : ",error))

    this.$axios.get('users').then((result) => {
      this.usersLength = result.data.length
    })
  },

  methods: {
    nFormatter(num) {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
      }
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      }
      return num
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
  },
}
</script>

<style lang="scss" scoped>
</style>