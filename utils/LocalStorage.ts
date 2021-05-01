export const LocalStorage = {
  setItem(key: string, value: string) {
    if (!process.client) return
    return window.localStorage.setItem(key, value)
  },
  getItem(key: string) {
    if (!process.client) return null
    return window.localStorage.getItem(key)
  },
  removeItem(key: string) {
    if (!process.client) return
    return window.localStorage.removeItem(key)
  },
}
