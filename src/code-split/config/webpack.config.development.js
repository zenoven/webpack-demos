import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
import baseConfig from './webpack.config.base'

const root = path.join(__dirname, '../../../')
const projectPath = path.join(__dirname, '../')
const buildPath = path.join(root, 'build', path.basename(projectPath) )
const mode = process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'

const config = Object.assign({}, baseConfig, {
  mode: mode,
  devtool: 'source-map',
  devServer: {
    contentBase: buildPath,
    host: '0.0.0.0',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(buildPath, {
      root: root
    }),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: !isProduction ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    })
  ]
})

export default config
