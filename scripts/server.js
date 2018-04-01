import webpack from 'webpack'
import parseArgs from 'minimist'
import path from 'path'
const root = path.join(__dirname, '../')
console.log('process.argv:', process.argv)
const args = parseArgs(process.argv.slice(2), {
  alias: {
    'p' : 'project'
  }
})
const project = args['project']
const ENV = process.env.NODE_ENV
const configDir = path.join(root, 'src', project)
const config = require(`${configDir}/webpack.config.${ENV}.js`)

console.log('config:', config)

