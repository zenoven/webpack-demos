// scrollTop animation
let scrollTop = (el, from = 0, to, duration = 500) => {
  const difference = Math.abs(from - to)
  const percentToMove = 1/5
  const minStep = 1
  let rafID = null
  let count = 0

  function scroll (start, end) {
    if (start === end) {
      rafID && window.cancelAnimationFrame(rafID)
      return
    }

    let next
    let diff = end - start
    let step = parseInt(percentToMove * diff)
    if(step < minStep) {
      step = minStep
    }
    if(start + step >= end) {
      next = end
    }else {
      next = start + step
    }

    if (el === window) {
      window.scrollTo(0, next)
    } else {
      console.log('document.body:', document.documentElement.scrollTop)
      document.documentElement.scrollTop = next
      console.log('document.body:', document.documentElement.scrollTop)
    }
    console.log(count++)

    window.requestAnimationFrame(() => scroll(next, end), 50)
  }
  scroll(from, to)
}

let element = document.getElementById('main')
console.clear()

scrollTop(element, 0, parseInt(element.clientHeight) / 2)
// scrollTop(element, 0, 2000)
