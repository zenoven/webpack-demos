/**
 * Created by zenoven@2018/5/14 19:28
 */
const index = async(ctx, next) => {
  let {user} = ctx.params
  ctx.body = `hello ${user} from index controller`
  next()
}

index.path = '/test/:user'
index.method = ['post', 'get']

export default index
