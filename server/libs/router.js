import glob from 'glob'
import path from 'path'
import KoaRouter from 'koa-router'
import {type} from "./utils";

const router = new KoaRouter({
  prefix: '/api'
})

const controllersPath = path.join(__dirname, '../controllers')

glob.sync('**/*.js', {
  cwd: controllersPath
}).forEach( (ctrPath) => {
  ctrPath = ctrPath.replace(/([\/\\]?index)?\.js$/, '')
  let controller = require(path.join(controllersPath, ctrPath)).default
  let method = controller.method || 'all' // method可为数组，也可为string，甚至为空
  let pth = controller.path || `/${ctrPath}`

  if(type(method) === 'array' && method.length) {
    method.forEach(m => {
      router[m](pth, controller)
    })
  }else{
    router[method](pth, controller)
  }

})

export default router
