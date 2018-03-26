var webpack = require('webpack')
var path = require('path')
var root = path.join(__dirname, './')
var buildPath = path.join(root, '../../build/code-split')

console.log('root:', root)
console.log('buildPath:', buildPath)

const config = {
  entry: {
    index: './index.js'
  },
  context: root,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: buildPath
  }
}

module.exports = config
