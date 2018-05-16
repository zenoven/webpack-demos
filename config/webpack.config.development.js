import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'
import HTMLWebpackPlugin from "html-webpack-plugin"
import glob from 'glob'
import HappyPack from 'happypack'
import os from 'os'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'app')
const buildPath = path.join(root, 'build', path.basename(srcPath) )
const mode = process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'
const entry = {}
const plugins = []
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

glob.sync('pages/**/*.js', {cwd: srcPath})
  .forEach( (filePath) => {
    let chunk = filePath.slice(0 , path.extname(filePath).length * -1)
    entry[chunk] = [`./${chunk}`]
  } )

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

const config = {
  mode: mode,
  entry: entry,
  context: srcPath,
  devtool: 'source-map',
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader',
        options: {
          id: 'js'
        }
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'happypack/loader',
              options: {
                id: 'style'
              }
            }
          ]
        })
      },
      {
        oneOf: [
          {
            test: /\.html/,
            resourceQuery: /\?.*/,
            use: [
              'nunjucks-loader',
              'extract-loader',
              'html-loader'
            ]
          },
          {
            test: /\.html$/,
            use: [
              'html-loader'
            ]
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(gif|png|jpg|jpeg|eot|ttf|svg|woff)/,
            resourceQuery: /\?.*/,
            loader: 'url-loader'
          },
          {
            test: /\.(gif|png|jpg|jpeg|eot|ttf|svg|woff)$/,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'style',
      loaders: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('postcss-import')({root: loader.resourcePath}),
              require('autoprefixer')(), //CSS浏览器兼容
              require('cssnano')()  //压缩css
            ]
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(buildPath, {
      root: root
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '[name].css'
    }),
  ].concat(plugins),
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
  }
}

export default config
