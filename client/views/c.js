function find(target, array) {
  let currentRow = 0
  let currentColumn = array[0].length - 1
  let currentNumber
  while(currentRow <= array.length - 1 && currentColumn >= 0 ) {

    currentNumber = array[currentRow][currentColumn]
    if(target === currentNumber) {
      return true
    }else if(target > currentNumber){
      currentRow += 1
    }else{
      currentColumn -= 1
    }
  }
  return false
}

let arr = [
  [ 1, 2, 8, 9],
  [ 2, 4, 9, 12],
  [ 4, 7, 10, 13],
  [ 6, 8, 11, 15],
]

console.log(find(22, arr))
