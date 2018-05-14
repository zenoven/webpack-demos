const fs = require('fs')
let chunk = fs.readFileSync('./chunks' )
let data = []
console.log('chunk:', chunk.toString())
