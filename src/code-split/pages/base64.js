function encode(binaryStr) {
  let encoded = encodeURIComponent(binaryStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode('0x' + p1)
  })
  return window.btoa(encoded)
}

function decode(asciiStr) {
  return decodeURIComponent(window.atob(asciiStr).split('').map( c => {
    console.log(c.charCodeAt(0))
    console.log('00' + c.charCodeAt(0).toString(16))
    console.log( ('00' + c.charCodeAt(0).toString(16)).slice(-2) )
    return '%' + ( '00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

let str = '✓ à la mode'
let encodedStr = encode(str)
console.log('encodedStr:', encodedStr)
let decodedStr = decode(encodedStr)
console.log('decodedStr:', decodedStr)

console.log('decodedStr === str:', decodedStr === str)
