import Koa from 'koa'
import appConfig from '../config/index'
import router from './libs/router'
import views from './middlewares/views'
import fetch from './middlewares/fetch'
const app = new Koa()

app.use(views)
app.use(fetch)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(appConfig.server.port, () => {
  console.log('server started')
})
