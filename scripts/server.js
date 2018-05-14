import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import parseArgs from 'minimist'
import path from 'path'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import IP from 'dev-ip'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

const devIP = IP()[0]
const root = path.join(__dirname, '../')
const args = parseArgs(process.argv.slice(2))
const project = args['project']
const env = args['env'] || 'development'
const projectPath = path.join(root, 'src', project)
const buildPath = path.join(root, 'build', path.basename(projectPath) )
const config = require(`${projectPath}/config/webpack.config.${env}.js`).default
const appConfig = yaml.safeLoad(fs.readFileSync(`${projectPath}/config/app.yml`))
const {server: {devPort}} = appConfig

const devClient = [`webpack-dev-server/client?http://${devIP}:${devPort}`]
const publicPath = config.output.publicPath = `http://${devIP}:${devPort}/build/${path.basename(projectPath)}/`

Object.keys(config.entry).forEach(chunk => {
  config.entry[chunk] = devClient.concat(chunk)
})

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  host: '0.0.0.0',
  compress: true,
  disableHostCheck: true,
  contentBase: path.join(buildPath, 'pages'),
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
    '/build': {
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
    const filePath = path.relative(outputPath, asset.existsAt)

    if (path.extname(filePath) === '.html') {
      const content = asset.source()
      const distPath = path.join(buildPath, filePath)
      return fs.outputFileAsync(distPath, content)
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
 * publicPath  /build/
 * proxy  /build =>   webpack-dev-server
 * `webpack-dev-server/client?http://${devIP}:${devPort}`
 *
 *
 */

