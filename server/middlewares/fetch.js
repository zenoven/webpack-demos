/**
 * Created by zenoven@2018/5/15 17:55
 */
import axios from 'axios'

const defaults = {
  // baseURL: '/api',
  timeout: 10000,
}
export default async(ctx, next) => {
  ctx.fetch = axios.create(defaults)
  await next()
}
