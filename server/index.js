import Koa from 'koa'
import appConfig from '../config/index'
import router from './libs/router'
import views from './middlewares/views'
import fetch from './middlewares/fetch'
import bodyParser from 'koa-body'
import path from 'path'

const app = new Koa()

app.use(views)
app.use(fetch)
app.use(bodyParser({
  multipart: true,
  formLimit: '1mb',
  formidable: {
    uploadDir: path.join(__dirname, './upload'),
    maxFieldsSize: '1mb',
    keepExtensions: true
  }
}))
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(appConfig.server.port, () => {
  console.log('koa2 server started')
})
