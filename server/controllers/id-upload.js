/**
 * Created by zenoven@2018/5/21 16:58
 */

const photo = async(ctx, next) => {
  await ctx.render('id-upload', )
  await next()
}

photo.path = '/id-upload'
photo.method = ['post', 'get']

export default photo
