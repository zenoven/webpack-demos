function compose(){
  let functions = [].slice.call(arguments)
  if(!functions) {
    throw new Error('参数不能为空')
  }
  if(functions.length < 2) {
    return functions[0]
  }
  return functions.reduceRight( (func, next) =>  (...args) => next(func(...args)) )
}
//
// function shout(a){
//   console.log('shout called')
//   return a + '!'
// }
//
// function uppercase(str){
//   console.log('uppercase called')
//   return str.toUpperCase()
// }
//
// function addQuote(str){
//   console.log('addQuote called')
//   return `"${str}"`
// }
//
// var composed = compose(shout, uppercase, addQuote)

export default compose
