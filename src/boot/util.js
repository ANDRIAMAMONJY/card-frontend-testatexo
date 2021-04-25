import { date, Notify, Loading } from 'quasar'
export const util = {
  convertDate (dt, format = 'DD/MM/YYYY') {
    return date.formatDate(new Date(dt), format)
  },
  convertUnixToDate (unix, format = 'DD/MM/YYYY') {
    const dt = new Date(unix)
    return date.formatDate(dt, format)
  },
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
  },
  getImageBinary (inp, file) {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        inp.push(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  },
  findByAttribute (list, attribute, value) {
    return list.find(l => {
      return l[attribute] === value
    })
  },
  openURL (label, link) {
    if (!link) this.showError(`Pas de ${label}`)
    else window.open(link, '_blank')
  },
  separateurMillier (nombre) {
    return nombre.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  },
  dhm2 (ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000)),
      daysms = ms % (24 * 60 * 60 * 1000),
      hours = Math.floor((daysms) / (60 * 60 * 1000)),
      hoursms = ms % (60 * 60 * 1000),
      minutes = Math.floor((hoursms) / (60 * 1000)),
      minutesms = ms % (60 * 1000),
      sec = Math.floor((minutesms) / (1000))
    let time = 0
    let unite = 'days'
    if (days !== 0) {
      time = days
      unite = 'days'
    } else if (hours !== 0) {
      time = hours
      unite = 'hours'
    } else if (minutes !== 0) {
      time = minutes
      unite = 'minutes'
    } else {
      time = sec
      unite = 'secondes'
    }
    return {
      time: time,
      unite: unite
    }
  },
  dateDiff (dt) {
    const dN = new Date()
    const changedDate = dt.replace(/(..)-(..)-(....) (..):(..):(..)/, '$3-$2-$1 $4:$5:$6')
    const dT = new Date(changedDate)
    return (dN - dT)
  },
  ilYa (date) {
    return this.dhm2(this.dateDiff(date))
  },
  getIlYa (dt) {
    if (!dt) return ''
    const ilya = this.ilYa(dt)
    if (!ilya) return ''
    if (ilya.time === 0) return 'Now'
    return `${ilya.time} ${ilya.unite}`
  },
  validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  },
  validateURL (str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
    return !!pattern.test(str)
  },
  validateURL2 (url) {
    const re = /(ftp|https?):\/\/[^ "]+$/
    return re.test(url)
  },
  showNotif () {
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne prend pas en charge la notification de bureau')
    } else if (Notification.permission === 'granted') {
      this.onNotifClicked()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.onNotifClicked()
        }
      })
    }
  },
  onNotifClicked () {
    const notification = new Notification('Visiotranslate', {
      icon: 'https://visiotranslate-tech.com/icon.png',
      body: 'Click here to bascule to technician page!'
    })
    notification.onclick = (e) => {
      window.focus()
      console.log('on click', e)
    }
  },
  separator (n, space = ' ') {
    let ret = ''
    if (n === 0) return '0'
    let i = 0
    while (n >= 1) {
      i++
      const temp = n % 10
      n = Math.floor(n / 10)
      if (i === 4) {
        ret = space + ret
        i = 1
      }
      ret = temp + ret
    }
    return ret
  },
  random (min, max) {
    return Math.random() * (max - min) + min
  },
  prefix (num, prefix) {
    if (num < 10) return `${prefix}00${num}`
    if (num < 100) return `${prefix}0${num}`
    return `${prefix}${num}`
  },
  getSemaine () {
    const nd = new Date()
    let day = nd.getDay()
    if (day === 0) day = 7
    const hebd = []
    for (let i = 1; i <= 7; i++) {
      const data = this.convertDate(new Date().setDate(nd.getDate() - day + i), 'YYYY-MM-DD')
      hebd.push(data)
    }
    return hebd
  },
  getMois () {
    const nd = new Date()
    const year = nd.getFullYear()
    const months = []
    for (let i = 1; i <= 9; i++) {
      months.push(`${year}-0${i}`)
    }
    for (let i = 10; i <= 12; i++) {
      months.push(`${year}-${i}`)
    }
    return months
  },
  getDayMonth () {
    const last = this.lastDayOfMonth()
    const ret = []
    for (let i = 1; i < 10; i++) {
      ret.push(`0${i}`)
    }
    for (let i = 10; i <= last; i++) {
      ret.push(`${i}`)
    }
    return ret
  },
  lastDayOfMonth () {
    const dt = new Date()
    const month = dt.getMonth()
    const d = new Date(dt.getFullYear(), month + 1, 0)
    return d.getDate()
  },
  getRandom (min, max) {
    return Math.random() * (max - min) + min
  }
}

export default ({ Vue }) => {
  Vue.prototype.$util = util
}
