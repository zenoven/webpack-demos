var common = require('./common.js')

require.ensure(['./a.js'], function(require){
  require('./b.js')
})

require.ensure(['./b.js'], function(require){
  require('./c.js')
})

