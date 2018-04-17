import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import parseArgs from 'minimist'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'

const root = path.join(__dirname, '../')
const args = parseArgs(process.argv.slice(2))
const project = args['project']
const env = args['env'] || 'development'
const projectDir = path.join(root, 'src', project)
const config = require(`${projectDir}/config/webpack.config.${env}.js`).default
const compiler = webpack(config)
const appConfig = yaml.safeLoad(fs.readFileSync(`${projectDir}/config/app.yml`))
const {server: {devPort}} = appConfig

compiler.plugin('compile', (stats) => {
  console.log('webpack compiling...')
})

compiler.plugin('done', (stats) => {
  const time = (stats.startTime - stats.endTime) / 1000

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
  console.log('webpack build successfully')
  console.log('stats', stats)
})

const server = new WebpackDevServer(compiler, {
  compress: true,
  disableHostCheck: true,
  watchOptions: {
    aggregateTimeout: 300
  },
  stats: {
    colors: true
  }
})

server.listen(devPort, () => {
  console.log('dev server started')
})

