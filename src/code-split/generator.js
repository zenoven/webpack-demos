export default {
  *test(x) {
    // console.log('x:', x)
    let y = yield x + 1
    // console.log('x:', x)
    // console.log('y:', y)
    let z = yield x + y
    // console.log('x:', x)
    // console.log('y:', y)
    // console.log('z:', z)
    yield x + y + z
  },
  start(){
    let getResult = this.test(10)
    console.log('a:', getResult.next())     //{value: 11, done: false}  x = 10
    console.log('b:', getResult.next(5))    //{value: 15, done: false}  x = 10  y = 5
    console.log('c:', getResult.next(6))    //{value: 21, done: false}  x = 10  y = 5  z = 6
    console.log('d:', getResult.next(7))    //{value: undefined, done: true}  x = 10  y = 5  z = 6
  }
}

/***
 * 1 每次执行next(input) 时计算到yield ... ，而如果 someVar = yield ...，则someVar并没有被yield后面的表达式赋值
 * 2 next(input) 将input的值作为上次yield表达式的计算结果
 */
