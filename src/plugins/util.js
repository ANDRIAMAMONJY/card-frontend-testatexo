import { Notify, Loading } from 'quasar'
export const util = {
  showLoading () {
    Loading.show()
  },
  hideLoading () {
    Loading.hide()
  },
  showMessage: (message) => {
    Notify.create({
      message: message,
      color: 'positive',
      position: 'top-right',
      timeout: 3000
    })
  },
  showError (message) {
    Notify.create({
      message: message,
      timeout: 3000,
      icon: 'report_problem',
      color: 'negative',
      position: 'top-right'
    })
  }
}
