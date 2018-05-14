/**
 * Created by zenoven@2018/5/14 21:03
 */
export function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
