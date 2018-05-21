/**
 * Created by zenoven@2018/5/21 16:08
 */
function getUserMedia(constrants){
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

    return navigator.mediaDevices.getUserMedia(constrants)
  }

  let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
  if(!getUserMedia) {
    return Promise.reject(new Error('很抱歉,您的浏览器不支持此功能'))
  }

  return new Promise((resolve, reject) => {
    getUserMedia.call(navigator, constrants, resolve, reject)
  })

}

getUserMedia.isNewAPI = !! (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

export default getUserMedia
