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

const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  }
})

server.listen(devPort, () => {
  console.log('dev server started')
})

