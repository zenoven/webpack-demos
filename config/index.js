import fs from 'fs-extra'
import yaml from 'js-yaml'
import path from 'path'

const filePath = path.join(__dirname, 'app.yml')
const appConfig = yaml.safeLoad(fs.readFileSync(filePath))

export default appConfig
