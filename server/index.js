import Koa from 'koa'
import appConfig from '../config/index'
import router from './libs/router'
import views from './middlewares/views'
const app = new Koa()

app.use(views)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(appConfig.server.port, () => {
  console.log('server started')
})
