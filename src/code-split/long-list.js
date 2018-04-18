const COUNT = 10000
module.exports = {
  calcTime(func, timeLogs){
    var start = new Date()
    typeof func === 'function' && func()
    setTimeout(function(){
      var duration = (new Date()) - start
      timeLogs.push({
        methods: func.name,
        time: duration
      })
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
      item.appendChild(document.createTextNode('createWithTextNodes:' + i))
      document.body.appendChild(item)
    }
  },

  createWithFragment(){
    var fragment = document.createDocumentFragment()
    for(let i = 0; i < COUNT; i++) {
      let item = document.createElement('div')
      item.appendChild(document.createTextNode('createWithFragment:' + i))
      fragment.appendChild(item)
    }
    document.body.appendChild(fragment)
  },

  createWithInnerHTML(){
    var arr = []
    var element = document.createElement('div')
    for(let i = 0; i < COUNT; i++) {
      arr.push('createWithInnerHTML:' + i)
    }
    element.innerHTML = arr.join('<br/>')
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
        this.calcTime(func, logs)
      }, index * 5000)
    })

    this.observe()
  },
  observe(){
    let observer = new MutationObserver( (mutations, obs) => {
      mutations.forEach( (m, index) => {
        index <= 4 && console.log('mutation:', m)
      })
      console.log('observer in callback:', obs)
      console.log('observer outer:', observer)
      console.log('equal? ', observer === obs)
    })
    observer.observe(document.body, {
      subtree: true,
      childList: true
    })
  }
}
