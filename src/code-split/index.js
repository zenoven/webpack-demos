var common = require('./common.js')
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

