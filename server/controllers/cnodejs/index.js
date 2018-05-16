/**
 * Created by zenoven@2018/5/16 09:54
 */
const prefix = ' https://cnodejs.org/api/v1'

const index = async(ctx, next) => {
  try{
    let topics = await ctx.fetch(`${prefix}/topics`)
      .then(res => {
        let {data} = res
        if(data.success){
          console.log(data.data[0])
          console.log('in success')
          return data.data
        }else{
          console.log('in throw')
          throw new Error(data.msg)
        }
      }).catch(e => {
        throw e
      })

    await ctx.render('pages/foo/index.html', {
      topics
    })

  }catch (e) {
    console.log('e', e)
  }
  await next()
}

index.path = '/cnodejs'

export default index
