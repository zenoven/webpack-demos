import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
import baseConfig from './webpack.config.base'
import HTMLWebpackPlugin from "html-webpack-plugin"
import glob from 'glob'

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'app')
const buildPath = path.join(root, 'build', path.basename(srcPath) )
const mode = process.env.NODE_ENV || 'development'
const entry = baseConfig.entry
const isProduction = mode === 'production'

const plugins = []

glob.sync('pages/**/*.html', {cwd: srcPath})
  .forEach( (filePath) => {
    let chunk = filePath.slice(0, path.extname(filePath).length * -1)

    plugins.push(new HTMLWebpackPlugin({
      filename: filePath,
      template: filePath,
      minify: !isProduction ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
      chunks: entry[chunk] ? [ chunk ] : []
    }))
  })

const config = Object.assign({}, baseConfig, {
  mode: mode,
  devtool: 'source-map',
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
