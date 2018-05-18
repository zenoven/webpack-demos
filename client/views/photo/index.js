/**
 * Created by zenoven@2018/5/18 15:38
 */
import styles from './index.less'

let config = {video: true}
function getUserMedia(constrains){
  return new Promise((resolve, reject) => {
    if(navigator.mediaDevices.getUserMedia){
      //最新标准API
      alert('最新标准API')
      console.log('最新标准API')
      navigator.mediaDevices.getUserMedia(constrains).then(resolve).catch(reject);
    } else if (navigator.webkitGetUserMedia){
      //webkit内核浏览器
      alert('webkit内核浏览器')
      console.log('webkit内核浏览器')
      navigator.webkitGetUserMedia(constrains).then(resolve).catch(reject);
    } else if (navigator.mozGetUserMedia){
      //Firefox浏览器
      alert('Firefox浏览器')
      console.log('Firefox浏览器')
      navagator.mozGetUserMedia(constrains).then(resolve).catch(reject);
    } else if (navigator.getUserMedia){
      //旧版API
      alert('旧版API')
      console.log('旧版API')
      navigator.getUserMedia(constrains, resolve, reject);
    }
  })

}

document.addEventListener('DOMContentLoaded', function(){
  let video = document.getElementById("video");
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");

  //注册拍照按钮的单击事件
  document.getElementById("capture").addEventListener("click",function(){
    //绘制画面
    context.drawImage(video,0,0,480,320);
  });

  console.log(getUserMedia)

  getUserMedia(config)
    .then(stream => {
      // debugger
      video.src = (window.URL || window.webkitURL).createObjectURL(stream)
      video.play()
    })
    .catch(err => {
      console.log(err)
      alert('您的浏览器不支持此功能')
    })
}, false)
