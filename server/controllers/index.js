/**
 * Created by zenoven@2018/5/14 19:28
 */
const index = async(ctx, next) => {
  let {
    name
  } = ctx.query
  name = name || 'world'
  await ctx.render('pages/index', {
    title: `Hello, ${name}`,
  })
  await next()
}

index.path = '/'
index.method = ['post', 'get']

export default index
