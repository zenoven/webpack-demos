function uniqueWithSet(arr) {
  return Array.from(new Set(arr))
}

function uniqueWithIndexOf(arr){
  let result = []
  for(let i = 0; i < arr.length; i++){
    if(result.indexOf(arr[i]) === -1){
      result.push(arr[i])
    }
  }
  return result
}

// 将uniqueWithIndexOf中的indexOf替换为includes
function uniqueWithIncludes(arr){
  let result = []
  for(let i = 0; i < arr.length; i++){
    if(!result.includes(arr[i])){
      result.push(arr[i])
    }
  }
  return result
}

function uniqueWithDoubleLoop(arr) {
  let result = []
  for(let i = 0, arrLen = arr.length; i < arrLen; i++){

    for(var j = 0, resultLen = result.length; j < resultLen; j++) {
      if(arr[i] === result[j]) {
        break
      }
    }

    // 内层循环执行完j === resultLen，说明当前result数组中不存在arr[i]，即arr[i]是唯一的
    if(j === resultLen){
      result.push(arr[i])
    }
  }
  return result
}

function uniqueWithObject(arr){

}
