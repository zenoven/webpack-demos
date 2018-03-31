import webpack from 'webpack'
import path from 'path'
const root = path.join(__dirname, '../../')
const projectPath = path.join(__dirname, './')
const buildPath = path.join(root, 'build', __dirname.slice(__dirname.lastIndexOf('/')))

console.log('__dirname', __dirname)
console.log('root:', root)
console.log('buildPath:', buildPath)

const config = {
  entry: {
    index: './index.js'
  },
  context: projectPath,
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      }

    ]
  }
}

export default config
