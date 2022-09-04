import * as cookie from 'vue-cookies'
export default function ({ $axios, $auth, redirect, store }) {
  console.log('this plugins is working ...')
  if (cookie.get('auth.user')) {
    $axios.onRequest((config) => {
      config.headers = {
        roleid: cookie.get('auth.user').roleId || null,
        iduser: cookie.get('auth.user').idUser || null,
      }
    })
  }

  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/error')
    }
  })
}
