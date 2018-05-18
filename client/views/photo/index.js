/**
 * Created by zenoven@2018/5/18 15:38
 */
import styles from './index.less'

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

function delay(duration){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration)
  })
}
getUserMedia.isNewAPI = navigator.mediaDevices && navigator.mediaDevices.getUserMedia

document.addEventListener('DOMContentLoaded', function(){
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  //注册拍照按钮的单击事件
  document.getElementById("capture").addEventListener("click",function(){
    //绘制画面
    context.drawImage(video,0,0,480,320);
  });

  console.log(getUserMedia.isNewAPI)

  delay(3000)
    .then(() => {
      return getUserMedia({
        video: getUserMedia.isNewAPI ? {
          facingMode: 'environment'
          // facingMode: 'environment'
        } : true
      })
    })
    .then(stream => {
      try {
        // 微信
        // Error: 很抱歉,您的浏览器不支持此功能
        // Safari 11
        // NotAllowedError: The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.
        if(typeof video.srcObject !== 'undefined'){  // 兼容Safari
          video.srcObject = stream
        }else{
          video.src = (window.URL || window.webkitURL).createObjectURL(stream)
        }
        video.play()
      }catch(e){
        alert(e)
      }
    })
    .catch(err => {
      console.log(err)
      alert('您的浏览器不支持此功能')
    })
}, false)
