let count = [10000, 50000, 100000]
let times = 10
let logs = []
module.exports = {
  // calcTime(func, timeLogs){
  //   var start = new Date()
  //   typeof func === 'function' && func()
  //   setTimeout(function(){
  //     var duration = (new Date()) - start
  //     timeLogs.push({
  //       methods: func.name,
  //       time: duration
  //     })
  //   })
  // },

  createWithEmptyNodes(count){
    for(let i = 0; i < count; i++) {
      let item = document.createElement('div')
      document.body.appendChild(item)
    }
  },

  createWithTextNodes(count){
    for(let i = 0; i < count; i++) {
      let item = document.createElement('div')
      item.appendChild(document.createTextNode('createWithTextNodes:' + i))
      document.body.appendChild(item)
    }
  },

  createWithFragment(count){
    var fragment = document.createDocumentFragment()
    for(let i = 0; i < count; i++) {
      let item = document.createElement('div')
      item.appendChild(document.createTextNode('createWithFragment:' + i))
      fragment.appendChild(item)
    }
    document.body.appendChild(fragment)
  },

  createWithInnerHTML(count){
    var arr = []
    var element = document.createElement('div')
    for(let i = 0; i < count; i++) {
      arr.push('createWithInnerHTML:' + i)
    }
    element.innerHTML = arr.join('<br/>')
    document.body.appendChild(element)
  },

  emptyContent(){
    document.body.innerHTML = ''
  },

  observe(functions){
    let self = this
    let target = document.body
    let options = {
      subtree: true,
      childList: true
    }
    let j = 0;
    let result = run(10000)

    window.getResult = () => {
      if(j < times) {
        result.next()
        console.log('logs:', logs)
        return j++
      }
      return console.log('done')
    }

    function* run(count){
      let i = 0
      while(i < times) {

        logs[i] = {}
        yield Promise.all(functions.map(func => {
          logs[i][func.name] = {startTime: Date.now()}
          return new Promise( (resolve, reject) => {
            let observer = new MutationObserver( (mutations, observer) => {
              observer.disconnect()
              self.emptyContent()
              logs[i][func.name].endTime = Date.now()
              logs[i][func.name].duration = logs[i][func.name].endTime - logs[i][func.name].startTime
              resolve()
            })
            observer.observe(target, options)
            func(count)
          })
        }))
        i++
      }
    }


  },

  start(){
    this.observe([
      this.createWithEmptyNodes,
      this.createWithTextNodes,
      this.createWithFragment,
      this.createWithInnerHTML
    ])
    window.logs = logs
  },
}
