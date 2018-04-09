const COUNT = 10000
module.exports = {
  calcTime(func, timeLogs){
    var start = new Date()
    typeof func === 'function' && func()
    setTimeout(function(){
      var duration = (new Date()) - start
      timeLogs.push(func.constructor.name + ':' + duration)
    })
  },

  createWithEmptyNodes(){
    for(let i = 0; i < COUNT; i++) {
      let item = document.createElement('div')
      document.body.appendChild(item)
    }
  },

  createWithTextNodes(){
    for(let i = 0; i < COUNT; i++) {
      let item = document.createElement('div')
      item.appendChild(document.createTextNode('' + i))
      document.body.appendChild(item)
    }
  },

  createWithFragment(){
    var fragment = document.createDocumentFragment()
    for(let i = 0; i < COUNT; i++) {
      let item = document.createElement('div')
      item.appendChild(document.createTextNode('' + i))
      fragment.appendChild(item)
    }
    document.body.appendChild(fragment)
  },

  createWithInnerHTML(){
    var arr = []
    var element = document.createElement('div')
    for(let i = 0; i < COUNT; i++) {
      arr.push('' + i)
    }
    element.innerHTML = arr.join('')
    document.body.appendChild(element)
  },

  start(){
    var testFunctions = [
      this.createWithEmptyNodes,
      this.createWithTextNodes,
      this.createWithFragment,
      this.createWithInnerHTML
    ]

    var logs = []

    testFunctions.forEach( (func, index) => {
      setTimeout(() => {
        calcTime(func, logs)
      }, index * 5000)
    })
  }
}
