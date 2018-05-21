
export default function rem() {
  let basis = 100 // px转为rem时计算基准值
  let MAX_WIDTH = 750 // 超出此宽度后页面居中显示，且字体不再增大
  let UI_WIDTH = 750 //UI稿宽度
  let SCALE = 2 //UI稿放大倍数
  let rootElement = document.documentElement
  let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'

  let calcFontSize = function(){
    let screenWidth = rootElement.clientWidth
    let width = screenWidth < MAX_WIDTH ? screenWidth : MAX_WIDTH
    let fontSize = basis * (width / UI_WIDTH) / SCALE
    rootElement.style.fontSize = fontSize + 'px'
    if(screenWidth > MAX_WIDTH) {
      rootElement.style.margin = 'auto'
      rootElement.style.width = MAX_WIDTH + 'px'
    }
  }

  window.addEventListener(resizeEvent, calcFontSize, false)
  document.addEventListener('DOMContentLoaded', calcFontSize, false)
}

