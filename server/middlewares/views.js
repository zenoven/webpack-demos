/**
 * Created by zenoven@2018/5/15 16:57
 */
import views from 'koa-views'
import path from 'path'

export default views(path.join(__dirname, '../views'), {
  map: {
    html: 'nunjucks'
  }
})
