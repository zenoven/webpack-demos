(function(){
  var basis = 100 // px转为rem时计算基准值
  var MAX_WIDTH = 750 // 超出此宽度后页面居中显示，且字体不再增大
  var UI_WIDTH = 750 //UI稿宽度
  var SCALE = 2 //UI稿放大倍数
  var rootElement = document.documentElement
  var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var calcFontSize = function(){
    var screenWidth = rootElement.clientWidth
    var width = screenWidth < MAX_WIDTH ? screenWidth : MAX_WIDTH
    var fontSize = basis * (width / UI_WIDTH) / SCALE
    rootElement.style.fontSize = fontSize + 'px'
    if(screenWidth > MAX_WIDTH) {
      rootElement.style.margin = 'auto'
      rootElement.style.width = MAX_WIDTH + 'px'
    }
  }
  if(!document.addEventListener) return
  window.addEventListener(resizeEvent, calcFontSize, false)
  document.addEventListener('DOMContentLoaded', calcFontSize, false)
})()
