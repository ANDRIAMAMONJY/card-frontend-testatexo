import CryptoJS from 'crypto-js'
const CRYPTOKEY = 'otwoo'
export const crypto = {
  encrypt (data) {
    return CryptoJS.AES.encrypt(data, CRYPTOKEY).toString()
  },
  decrypt (data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data.toString(), CRYPTOKEY)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (e) {
      return null
    }
  }
}
