export default function getScrollTop(){
  // https://stackoverflow.com/questions/19618545/body-scrolltop-vs-documentelement-scrolltop-vs-window-pageyoffset-vs-window-scro
  // https://github.com/Prinzhorn/skrollr/blob/master/src/skrollr.js#L627
  // window.pageYOffset 在IE9以下不可用
  // documentElement和body 与DTD有关，两个元素的scrollTop只有1个有值，所以取其一即可
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
