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
          image: document.getElementById(id).nextElementSibling.getElementsByClassName('thumbnail')[0],
          canvas: document.createElement('canvas'),
        }

        this.data[i].context = this.data[i].canvas.getContext('2d')

        this.data[i].input.addEventListener('change', (e) => {
          let file = e.target.files[0]
          if(!file) return
          if(file.type.indexOf('image') === 0) {
            this.data[i].reader.readAsDataURL(file)
          }
        })

        this.data[i].reader.addEventListener('load', (e) => {
          this.data[i].image.src = e.target.result
        })

        // 图片压缩、上传，不超过最大尺寸
        // 非箭头函数
        this.data[i].image.addEventListener('load', () => {
          this.resize(this.data[i])
        }, false)
      })

    }, false)


  },
  resize(data){
    let {canvas, context, image} = data
    let resizedWidth = image.naturalWidth
    let resizedHeight = image.naturalHeight
    console.log('originWidth:', image.naturalWidth)
    console.log('originHeight:', image.naturalHeight)
    if(image.naturalWidth > MAX_WIDTH || image.naturalHeight > MAX_HEIGHT) {
      if(image.naturalWidth / image.naturalHeight > 1) {
        resizedWidth = MAX_WIDTH
        resizedHeight = Math.round(MAX_WIDTH * image.naturalHeight / image.naturalWidth)
      }else{
        resizedHeight = MAX_HEIGHT
        resizedWidth = Math.round(MAX_HEIGHT * image.naturalWidth / image.naturalHeight)
      }
    }

    canvas.width = resizedWidth
    canvas.height = resizedHeight
    context.clearRect(0, 0, resizedWidth, resizedHeight)
    context.drawImage(image, 0, 0, resizedWidth, resizedHeight)

    canvas.toBlob((blob) => {
      // TODO: 上传图片？
      // console.log('blob:', blob)
    })
  }
}

page.init()
