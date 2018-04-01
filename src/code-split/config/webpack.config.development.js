import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
const root = path.join(__dirname, '../../')
const projectPath = path.join(__dirname, './')
const buildPath = path.join(root, 'build', __dirname.slice(__dirname.lastIndexOf('/')))
const mode = process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'

const config = {
  mode: mode,
  devtool: 'source-map',
  entry: {
    index: './index.js'
  },
  devServer: {
    contentBase: buildPath,
    host: '0.0.0.0',
    hot: true,
    inline: true
  },
  context: projectPath,
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkname].js',
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
}

export default config
