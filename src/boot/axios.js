import axios from 'axios'
// import { storage } from 'src/plugins/storage'
// import { set } from 'lodash'
// import globale from 'src/store/globale/state'
import { util } from 'src/plugins/util'

const myInstance = axios.create({
  baseURL: process.env.API_BASE_URL
})
const FORM_DATA = 'multipart/form-data'
// const FORM_JSON = 'application/json'
const FORM_URLENCODED = 'application/x-www-form-urlencoded'
const injectAuthToken = (options, authNeeded = true) => {
  if (authNeeded) {
    // set(options, ['headers', 'Authorization'], `Bearer ${storage.getStorage(globale.sToken)}`)
  }
  return options
}
const jsonToFormDataConverter = (json) => {
  const formData = new FormData()
  for (const key in json) {
    formData.append(key, json[key])
  }
  return formData
}
const convertDataToParams = (data) => {
  const params = new URLSearchParams()
  for (const key in data) {
    params.append(key, data[key])
  }
  return params
}
/**
 * Convert a data to a form param
 * @param multipart Indicate if a request is a multipart.
 * @param data The data object to convert
 * @return The form data as a FormData object or a form string data.
 */
const convertData = (data, multipart) => {
  if (multipart === FORM_URLENCODED) {
    return convertDataToParams(data)
  }
  return jsonToFormDataConverter(data)
}
const injectData = (options, data, json = null) => {
  if (data) {
    options.data = data
    if (json != null) {
      options.data = convertData(data, json)
      if (!options.headers) {
        options.headers = {}
      }
      options.headers['Content-Type'] = json
    }
  }
  return options
}
const buildRequestOptions = (method, url, data = null, authNeeded = true, json = false, contentType = FORM_DATA) => {
  const options = {
    method,
    url
  }
  const content = json ? null : contentType
  injectData(options, data, content)
  injectAuthToken(options, authNeeded)
  return options
}
const createAxiosResponseInterceptor = () => {
  // eslint-disable-next-line
  const interceptor = myInstance.interceptors.response.use(
    (response) => {
      return response.data
    }, async (error) => {
      const status = error.response.data.status
      const data = error.response.data.data
      switch (status) {
        case 400:
          if (typeof data === 'string') {
            util.showError(data)
          } else {
            for (const key in data) {
              switch (key) {
                case 'user_code':
                  break
                default:
                  util.showError(`${data[key]}`)
              }
            }
          }
          return Promise.reject(error.response.data)
        case 403:
          util.showMessage('Vous n\'êtes pas autorisé, veuillez contacter l\'admin')
          return Promise.reject(error.response.data)
        default:
          return Promise.reject(error.response.data)
      }
    }
  )
}
createAxiosResponseInterceptor()

export const axiosWrapper = {
  get: (url, authNeeded = true) => {
    return myInstance.request(buildRequestOptions('GET', url, null, authNeeded))
  },
  post: (url, data, authNeeded = true, json = false) => {
    return myInstance.request(buildRequestOptions('POST', url, data, authNeeded, json, FORM_URLENCODED))
  },
  put: (url, data, authNeeded = true, json = false) => {
    return myInstance.request(buildRequestOptions('PUT', url, data, authNeeded, json, FORM_URLENCODED))
  },
  delete: (url, authNeeded = true) => {
    return myInstance.request(buildRequestOptions('DELETE', url, null, authNeeded))
  }
}

export default ({ Vue }) => {
  Vue.prototype.$AxiosWrapper = axiosWrapper
}
