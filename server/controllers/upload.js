/**
 * Created by zenoven@2018/5/22 14:08
 */
/**
 * Created by zenoven@2018/5/14 19:28
 */
const upload = async(ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    code: 0,
    data: null,
    msg: 'success'
  }
  await next()
}

upload.path = '/upload'
upload.method = ['post', 'get']

export default upload
