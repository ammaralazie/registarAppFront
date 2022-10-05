<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select v-model="imageType" :items="selectImageType" item-text="typeName" item-value="idImageType"
            item-color="accent" outlined color="accent" label="نوع الصورة" @change="isTypeSelected = true"></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-file-input v-model="attachment" color="accent" outlined label="اختر الملف..." :disabled="!isTypeSelected"
            @change="isFileSelected = true"></v-file-input>
        </v-col>
      </v-row>
    </v-form>

    <v-btn depressed color="warning" large :disabled="!isFileSelected" @click="saveFile">
      <span class="secondary--text">حفظ المعلومات</span>
    </v-btn>

    <v-btn depressed color="accent" large class="mr-5 ml-5" @click="$store.commit('unset_stepper')">
      <span class="secondary--text">رجوع</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageType: '',
      selectImageType: [],
      attachment: null,
      isTypeSelected: false,
      isFileSelected: false,
    }
  },

  computed: {
    studentId() {
      return this.$store.state.lastStudentRegistered
    }
  },

  mounted() {
    this.$axios.get('imageTypes').then((type) => {
      this.selectImageType = type.data
    })

    this.$axios.get('students').then((student) => {
      this.students = student.data
    })
  },

  methods: {
    saveFile() {
      const data = {
        imagePath: '',
        imageTypeId: this.imageType,
        studentId: this.studentId,
      }
      const file = new FormData()
      file.append('attachment', this.attachment)

      /* 'http://161.22.43.108/upload' */
      /* 'http://localhost:3100/upload' */

      this.$axios.post('/upload', file).then((path) => {
        data.imagePath = path.data.imagePath
        this.$axios
          .post('addStudentImage', data)
          .then((result) => {
            this.$toast.success('تم حفظ المعلومات', {
              duration: 3000,
              position: 'top-center',
            })
          })
          .catch((error) => {
            this.$toast.error('حدث خطأ في حفظ المعلومات', {
              duration: 3000,
              position: 'top-center',
            })
            console.error(error)
          })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>