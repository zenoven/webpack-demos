/**
 * Created by zenoven@2018/5/21 17:00
 */
import './index.less'

const MAX_WIDTH = 1200
const MAX_HEIGHT = 1200

let page = {
  init(){
    this.bindEvents()
  },
  bindEvents(){
    document.addEventListener('DOMContentLoaded', () => {
      this.data = [];

      ['id-front', 'id-back'].forEach((id, i) => {
        console.log('id', id)
        this.data[i] = {
          input: document.getElementById(id),
          reader: new FileReader(),
          image: new Image(),
          canvas: document.createElement('canvas'),
        }

        this.data[i].context = this.data[i].canvas.getContext('2d')

        this.data[i].input.addEventListener('change', (e) => {
          let file = e.target.files[0]
          if(file.type.indexOf('image') === 0) {
            this.data[i].reader.readAsDataURL(file)
          }
        })

        this.data[i].reader.onload = (e) => {
          this.data[i].image.src = e.target.result
          console.log('result:\n')
          console.log(e.target.result)
        }

        // 图片压缩处理，不超过最大尺寸
        // 非箭头函数
        this.data[i].image.onload = function () {
          let originWidth = this.width
          let originHeight = this.height

          if(originWidth > MAX_WIDTH || originHeight > MAX_HEIGHT) {

          }
        }
      })

    }, false)


  }
}

page.init()
