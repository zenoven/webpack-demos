import webpack from 'webpack'
import webpackDevMiddleWare from 'webpack-dev-middleware'
import parseArgs from 'minimist'
import path from 'path'

const root = path.join(__dirname, '../')
const args = parseArgs(process.argv.slice(2))
const project = args['project']
const env = args['env'] || 'development'
const configDir = path.join(root, 'src', project)
const config = require(`${configDir}/config/webpack.config.${env}.js`)
const compiler = webpack(config)

