var common = require('./common.js')
require('./a.js')

require.ensure([], function(require){
  require('./b.js')
})

require.ensure(['./b.js'], function(require){
  require('./c.js')
})

