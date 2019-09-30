import axios from 'axios'
import responseInterceptor from './responseInterceptor'

axios.interceptors.response.use(responseInterceptor)

export default class Api {
  constructor (baseUrl, idSelector = entity => entity.id, apiVersion = '1.0') {
    this.baseUrl = baseUrl
    this.apiVersion = apiVersion
    this.idSelector = idSelector
  }

  getEtag = () => {
    return window.localStorage.getItem('etag') ? window.localStorage.getItem('etag') : null
  }

  getList = (page = undefined, pageSize = undefined) => {
    let url = `${this.baseUrl}?api-version=${this.apiVersion}`
    if (page !== undefined && pageSize !== undefined) {
      url += `&Page=${page}&PageSize=${pageSize}`
    }
    return axios.get(url)
  }
  getById = id => axios.get(`${this.baseUrl}/${id}?api-version=${this.apiVersion}`)
  create = entity => axios.post(`${this.baseUrl}?api-version=${this.apiVersion}`, entity)
  update = entity => axios.put(`${this.baseUrl}/${this.idSelector(entity)}?api-version=${this.apiVersion}`, entity, {
    headers: {
      'If-Match': this.getEtag()
    }
  })
  patch = entity => axios.patch(`${this.baseUrl}/${this.idSelector(entity)}?api-version=${this.apiVersion}`, entity, {
    headers: {
      'If-Match': this.getEtag()
    }
  })
  _delete = id => axios.delete(`${this.baseUrl}/${id}?api-version=${this.apiVersion}`, {
    headers: {
      'If-Match': this.getEtag()
    }
  })
}
