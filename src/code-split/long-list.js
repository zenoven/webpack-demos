let count = [10000, 50000, 100000]
let times = 10
let logs = []
window.logs = logs
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
    let test = run(10000)
    // while(!result.next().done){
    //   result.next()
    // }
    window.getResult = () => {
      let res = test.next()
      if(!res.done) {
        test.next()
        console.log('logs:', logs)
      }
      console.log('done with logs:', logs)
    }

    function* run(count){
      debugger
      let i = 0
      while(i < times) {
        console.log('--------i:', i)
        let currentQueue = functions.slice()
        console.log('--------currentQueue:', currentQueue)
        let currentTask
        logs[i] = {}
        while(currentTask = currentQueue.shift()) {
          console.log('--------currentTask:', currentTask)
          logs[i][currentTask.name] = {startTime: Date.now()}
          debugger
          yield new Promise( (resolve, reject) => {
            let observer = new MutationObserver( (mutations, observer) => {
              console.log('--------in MutationObserver callback, i:',)
              observer.disconnect()
              self.emptyContent()
              logs[i][currentTask.name].endTime = Date.now()
              logs[i][currentTask.name].duration = logs[i][currentTask.name].endTime - logs[i][currentTask.name].startTime
              resolve()
            })
            observer.observe(target, options)
            currentTask(count)
          })
        }
        i++
      }
      console.log('done')
    }


  },

  sleep(duration){
    return new Promise( (resolve, reject) => {
      setTimeout(resolve, duration)
    } )
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
