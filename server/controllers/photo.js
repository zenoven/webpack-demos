/**
 * Created by zenoven@2018/5/18 15:11
 */
const photo = async(ctx, next) => {
  await ctx.render('photo', {
    title: `H5拍照调用DEMO`,
  })
  await next()
}

photo.path = '/photo'
photo.method = ['post', 'get']

export default photo
