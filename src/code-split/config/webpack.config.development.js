import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
import baseConfig from './webpack.config.base'
import glob from 'glob'
const root = path.join(__dirname, '../../../')
const projectPath = path.join(__dirname, '../')
const buildPath = path.join(root, 'build', path.basename(projectPath) )
const mode = process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'

let plugins = []
let entry = {}

glob.sync('pages/**/*.js', {cwd: projectPath})
  .forEach( (file) => {
    let chunk = file.slice(0 , '.js'.length * -1)
    entry[chunk] = [`./${chunk}`]
  } )

glob.sync('pages/**/*.html', {cwd: projectPath})
  .forEach( (file) => {
    let chunk = file.slice(0, '.html'.length * -1)
    let chunkFile = `${chunk}.html`
    plugins.push(new HTMLWebpackPlugin({
      filename: file,
      template: file,
      minify: !isProduction ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      chunks: entry[chunk] ? [ chunk ] : false
    }))
  })

const config = Object.assign({}, baseConfig, {
  mode: mode,
  entry: entry,
  devtool: 'source-map',
  devServer: {
    contentBase: buildPath,
    host: '0.0.0.0',
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: buildPath
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(buildPath, {
      root: root
    }),
  ].concat(plugins)
})

export default config
