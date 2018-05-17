import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import path from 'path'
import fs from 'fs-extra'
import IP from 'dev-ip'
import Promise from 'bluebird'
import appConfig from '../config/index'

Promise.promisifyAll(fs)

const devIP = IP()[0]
const root = path.join(__dirname, '../')
const env = process.env.NODE_ENV || 'development'
const distPath = path.join(root, 'dist')
const viewsPath = path.join(root, 'server/views')
const configPath = path.join(root, `config/webpack.config.${env}.js`)
const config = require(configPath)
const {server: {devPort}} = appConfig

const devClient = [`webpack-dev-server/client?http://${devIP}:${devPort}`]
const publicPath = config.output.publicPath = `http://${devIP}:${devPort}/dist/`

fs.removeSync(viewsPath)

Object.keys(config.entry).forEach(chunk => {
  config.entry[chunk] = devClient.concat(chunk)
})

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  quiet: true,
  noInfo: true,
  // hot: true, // 需注释掉，否则热更新反而不管用
  inline: true,
  host: '0.0.0.0',
  compress: true,
  disableHostCheck: true,
  publicPath: publicPath,
  watchOptions: {
    aggregateTimeout: 300
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  },
  proxy: {
    '/dist': {
      target: `http://${devIP}:${devPort}/`,
      rewrite: (req) => {
        console.log('req:', req)
        req.url = 'webpack-dev-server'
      }
    }
  }
})

compiler.plugin('compile', (stats) => {
  console.log('webpack compiling...')
})

compiler.plugin('done', (stats) => {
  const time = (stats.endTime - stats.startTime) / 1000

  if(stats.hasErrors()){
    console.log('webpack build error')

    return console.log(stats.toString({
      colors: true,
      timings: false,
      hash: false,
      version: false,
      assets: false,
      reasons: false,
      chunks: false,
      children: false,
      chunkModules: false,
      modules: false
    }))
  }

  const outputPath = config.output.path
  const assets = stats.compilation.assets

  Promise.map(Object.keys(assets), (file) => {
    const asset = assets[file]
    const filePath = path.relative(path.join(distPath, 'client/views'), asset.existsAt)

    if (path.extname(filePath) === '.html') {
      const content = asset.source()
      const targetPath = path.join(viewsPath, filePath)
      return fs.outputFileAsync(targetPath, content)
    }
  }).then(() => {
    console.log(`webpack build success in ${time.toFixed(2)} s`)
  })

})

server.listen(devPort, () => {
  console.log('dev server started')
})

/***
 *
 * publicPath  /dist/
 * proxy  /dist =>   webpack-dev-server
 * `webpack-dev-server/client?http://${devIP}:${devPort}`
 *
 *
 */

