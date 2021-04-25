import { crypto } from './crypto'
export const storage = {
  getStorage (key) {
    const item = localStorage.getItem(key)
    return JSON.parse(crypto.decrypt(item))
  },
  setStorage (key, item) {
    localStorage[key] = crypto.encrypt(JSON.stringify(item))
  },
  removeStorage (key) {
    localStorage.removeItem(key)
  },
  clearAllStorage () {
    localStorage.clear()
  }
}
