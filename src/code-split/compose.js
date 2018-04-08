function compose() {
  let funcs = [].slice.call(arguments, 0)
  return function(){
    let args = arguments
    // return funcs.reverse().reduce((prev, next) => {
    //   return next(prev.apply(null, args))
    // })

    // or
    return funcs.reduceRight((prev, next) => {
      return next(prev.apply(null, args))
    })
  }
}

function shout(a){
  console.log('shout called')
  return a + '!'
}

function uppercase(str){
  console.log('uppercase called')
  return str.toUpperCase()
}

var composed = compose(shout, uppercase)

console.log(composed('hello world'))
