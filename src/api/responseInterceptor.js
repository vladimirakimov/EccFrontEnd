import humps from 'humps'

const responseInterceptor = (response) => {
  const etag = response.headers.etag || null
  const id = response.headers.location || null

  if (etag) window.localStorage.setItem('etag', etag.replace(/\D/g, ''))
  if (id) window.localStorage.setItem('createdID', id.split('/').pop())

  return humps.camelizeKeys(response.data)
}

export default responseInterceptor
