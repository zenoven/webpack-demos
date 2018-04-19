var common = require('./common.js')
var listTest = require('./long-list')
import Gen from './generator'
require('./a.js')

require.ensure([], function(require){
  require('./b.js')
  console.log('hello module b ')
})

require.ensure(['./b.js'], function(require){
  require('./c.js')
  console.log('hello module c')
})

console.log('hello world ')

document.addEventListener('DOMContentLoaded', function(){
  listTest.start()
  Gen.start()
})



