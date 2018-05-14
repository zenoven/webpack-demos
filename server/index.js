import Koa from 'koa'
import appConfig from '../config/index'
import router from './libs/router'

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(appConfig.server.port, () => {
  console.log('server started')
})
