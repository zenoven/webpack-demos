/**
 * Created by zenoven@2018/5/22 14:50
 */

const defaultOptions = {
  method: 'GET',
  headers: {
    'content-type': 'application/json'
  }
}

export default (url, options) => {
  let xhr = new XMLHttpRequest()
  options = Object.assign({}, defaultOptions, options)
  xhr.open(options.method, url)
  options.body = options.body ? formatData(options.headers['content-type'], options.body) : null

  if(options.headers['content-type'].indexOf('multipart/form-data') > -1) {
    console.log('options.headers:', options.headers)
    delete options.headers['content-type']
    console.log('options.headers:', options.headers)
  }

  Object.keys(options.headers).map(key => {
    xhr.setRequestHeader(key, options.headers[key])
  })



  xhr.send(options.body)

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 ){
        if((xhr.status >= 200 || xhr.status <= 300)){
          let type = xhr.getResponseHeader('content-type').toLowerCase()
          let result = null
          if(type.indexOf('xml') !== -1 && xhr.responseXML){
            result = xhr.responseXML
          }else if(type.indexOf('application/json')) {
            result = JSON.parse(xhr.responseText)
          }else{
            result = xhr.responseText
          }
          resolve(result)
        }else{
          reject(xhr.status)
        }
      }
    }
    xhr.onerror = reject
  })
}

function formatData(contentType, data){
  let result = null
  contentType = contentType.toLowerCase()

  if(contentType.indexOf('application/x-www-form-urlencoded') > -1){
    result = Object.keys(data).map(key => {
      return `${key}=${encodeURIComponent(data[key])}`
    }).join('&')
  }else if(contentType.indexOf('application/json') > -1) {
    result = JSON.stringify(data)
  }else if(contentType.indexOf('multipart/form-data') > -1){
    result = new FormData()
    Object.keys(data).forEach(field => {
      console.log(field)
      console.log(data[field])
      result.append(field, data[field])
    })
    console.log('result:', result)
    console.log('result.toString():', result.toString())
  }else{
    result = data
  }

  return result
}

