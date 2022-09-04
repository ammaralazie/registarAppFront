<template>
  <div>
    <v-dialog v-model="lightBox" fullscreen>
      <v-card class="shadow-1 rounded-1" color="primary">
        <v-toolbar class="shadow-1 rounded-1" color="primary">
          <v-btn color="success" depressed large @click="saveAndPrint()">
            <span>حفظ و طباعة</span>
          </v-btn>

          <v-spacer />

          <v-btn color="accent" icon @click="lightBox = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div id="printContent">
          <img class="align-end" :src="selectedImage" height="100%">
        </div>
      </v-card>
    </v-dialog>
    <v-form>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-select
            v-model="imageType"
            :items="selectImageType"
            item-text="typeName"
            item-value="idImageType"
            item-color="accent"
            outlined
            color="accent"
            label="نوع الصورة"
            @change="isTypeSelected = true"
          ></v-select>
        </v-col>

        <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">
          <v-file-input
            v-model="attachment"
            color="accent"
            outlined
            label="اختر الملف..."
            :disabled="!isTypeSelected"
            @change="isFileSelected = true"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-form>

    <v-btn
      depressed
      color="warning"
      large
      :disabled="!isFileSelected"
      @click="saveFile"
    >
      <span class="secondary--text">حفظ المعلومات</span>
    </v-btn>

    <div class="mt-10">
      <v-divider class="mb-5" />
      <v-row>
        <v-col
          v-for="images in studentImages"
          :key="images.idStudentImage"
          cols="12"
          xs="12"
          sm="12"
          :md="images.imageTypeId === 2 ? '8' : '4'"
          :lg="images.imageTypeId === 2 ? '8' : '4'"
          :xl="images.imageTypeId === 2 ? '8' : '4'"
        >
          <v-card class="shadow-1 rounded-1" color="primary">
            <img
              :key="images.idStudentImage"
              class="align-end imageUser"
              :src="$axios.defaults.baseURL + images.imagePath"
              :height="images.imageTypeId === 2 ? '600px' : '300px'"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              @dblclick="pickImage($axios.defaults.baseURL + images.imagePath)"
            >
              <v-card-title>
                <span class="grey--text">{{
                  images.imageTypeId === 1 ? 'صورة شخصية' : 'وثيقة'
                }}</span>
                <v-spacer />
                <v-btn
                  fab
                  color="error"
                  :disabled="!matchSections"
                  @click="deleteImage(images.idStudentImage)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div id="hiddenPrinter" class="d-none"></div>
  </div>
</template>

<script>
export default {
  props: {
    studentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      imageType: '',
      selectImageType: [],
      attachment: null,
      isTypeSelected: false,
      isFileSelected: false,
      studentImages: [],
      selectedImage: '',
      lightBox: false,
      sectionId: null
    }
  },

  computed: {
    matchSections() {
      const userSection = this.$auth.user.sectionId
      const studentSection = this.sectionId

      return (studentSection === userSection)
    }
  },

  mounted() {
    this.$axios.get('imageTypes').then((type) => {
      this.selectImageType = type.data
    })

    this.getStudentImage()
  },

  methods: {
    async getStudentImage() {
      try {
        const images = await this.$axios.get(`student/${this.studentId}`)
        this.studentImages = images.data.studentImage
        this.sectionId = images.data.section.idSection
      } catch (e) {
        console.error(e.response)
      }
    },

    pickImage(url) {
      this.selectedImage = url
      this.lightBox = true
    },

    saveAndPrint() {
      // const printContent = this.selectedImage
      const windowUrl = 'about:blank'
      const uniqueName = new Date()
      const windowName = 'Print' + uniqueName.getTime()

      const printWindow = window.open(
        windowUrl,
        windowName,
        'left=50000,top=50000,width=0,height=0,status=yes'
      )

      const newImage = document.createElement('img')
      newImage.setAttribute('src', this.selectedImage)

      printWindow.document.body.append(newImage)
      // printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      // printWindow.close()

      this.lightBox = false
    },

    deleteImage(id) {
      if (confirm('حذف الصورة ؟')) {
        this.$axios.delete(`studentImage/${id}`).then(() => {
          this.$toast.success('تم حذف الصورة', {
            duration: 3000,
            position: 'top-center',
          })

          this.getStudentImage()
        })
      }
    },

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
      this.$axios.post('http://localhost:3100/upload', file).then((path) => {
        data.imagePath = path.data.imagePath
        this.$axios
          .post('addStudentImage', data)
          .then((result) => {
            this.$toast.success('تم حفظ المعلومات', {
              duration: 3000,
              position: 'top-center',
            })

            this.getStudentImage()
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
.imageUser{
  width: 100%;
  height: 100%
}/* /imageUser */
</style>