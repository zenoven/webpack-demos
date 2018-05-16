import path from 'path'
import glob from 'glob'

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'app')
const buildPath = path.join(root, 'build' )
const mode = process.env.NODE_ENV || 'development'

let plugins = []
let entry = {}

glob.sync('pages/**/*.js', {cwd: srcPath})
  .forEach( (filePath) => {
    let chunk = filePath.slice(0 , path.extname(filePath).length * -1)
    entry[chunk] = [`./${chunk}`]
  } )

const config = {
  mode: mode,
  entry: entry,
  context: srcPath,
  output: {
    filename: '[name].[chunkhash:22].js',
    chunkFilename: '[name].[chunkhash:22].js',
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
  },
  resolve: {
    alias: {
      c: path.join(srcPath, 'libs'),
      common: path.join(srcPath, 'common'),
      components: path.join(srcPath, 'components'),
      libs: path.join(srcPath, 'libs'),
    },
    modules: [
      srcPath,
      'libs',
      'components',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.less']
  },
}

export default config
