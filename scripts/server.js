import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import parseArgs from 'minimist'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import IP from 'dev-ip'

const devIP = IP()[0]
const root = path.join(__dirname, '../')
const args = parseArgs(process.argv.slice(2))
const project = args['project']
const env = args['env'] || 'development'
const projectDir = path.join(root, 'src', project)
const config = require(`${projectDir}/config/webpack.config.${env}.js`).default
const compiler = webpack(config)
const appConfig = yaml.safeLoad(fs.readFileSync(`${projectDir}/config/app.yml`))
const {server: {devPort}} = appConfig

const devClient = [`webpack-dev-server/client?http://${devIP}:${devPort}`]
const publicPath = `http://${devIP}:${devPort}/build/`
compiler.plugin('compile', (stats) => {
  console.log('webpack compiling...')
})

Object.keys(config.entry).forEach(chunk => {
  config.entry[chunk] = devClient.concat(chunk)
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
  console.log(`webpack build successfully in ${time}s`)
})

console.log('config.output:', config.output)
console.log('devIP:', devIP)

const server = new WebpackDevServer(compiler, {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  host: '0.0.0.0',
  compress: true,
  disableHostCheck: true,
  contentBase: projectDir,
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
        req.url = 'webpack-dev-server'
      }
    }
  }
})

server.listen(devPort, () => {
  console.log('dev server started')
})

