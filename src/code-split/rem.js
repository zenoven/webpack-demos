(function(){
  var basis = 20
  var MAX_WIDTH = 750
  var rootElement = document.documentElement
  var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var calcFontSize = function(){
    var screenWidth = rootElement.clientWidth
    var width = screenWidth < MAX_WIDTH ? screenWidth : MAX_WIDTH
    var fontSize = width / basis
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
