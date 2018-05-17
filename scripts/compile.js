/**
 * Created by zenoven@2018/5/17 15:39
 */
import webpack from 'webpack'
import path from 'path'
import fs from 'fs-extra'
import IP from 'dev-ip'
import Promise from 'bluebird'
import appConfig from '../config/index'
import execa from 'execa'
import glob from 'glob'
// import babel from 'babel-core'

Promise.promisifyAll(fs)


let env = process.env.NODE_ENV || 'development'

// 预发环境同测试环境处理
if (env === 'staging') {
  env = 'test'
}

console.log(`start compiling with env:${env}`)

const devIP = IP()[0]
const root = path.join(__dirname, '../')
const distPath = path.join(root, 'dist')
const configPath = path.join(root, `config/webpack.config.${env}.js`)
const config = require(configPath).default
const {server: {devPort}} = appConfig

let start = Date.now()
Promise
  .resolve()
  .then(() => {
    // 文件清理
    return Promise.all([
      fs.removeAsync(distPath),
    ])
  })
  .then(() => {
    console.log('transforming server side code...')
    return execa.shell(`babel server -d dist/server`).then(result => {
      console.log(result.stdout)
    })
  })
  .then(() => {
    // build
    console.log('webpack building client side code...')

    if(env === 'development') {
      config.output.publicPath = `http://${devIP}:${devPort}/dist/`
    }
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if(err || stats.hasErrors()) {
          console.log(stats.toString({
            colors: true,
            timings: true,
            hash: true,
            version: true,
            errorDetails: true,
            assets: false,
            chunks: false,
            children: false,
            modules: false,
            chunkModules: false
          }))
          return reject(err)
        }
        let duration = (stats.endTime - stats.startTime) / 1000
        console.log(`webpack build successfully in ${duration.toFixed(2)}s`)
        resolve()
      })
    })
  })
  .then(() => {
    console.log('moving views...')
    let views = glob.sync('**/*.html', {
      cwd: path.join(distPath, '/client/')
    })

    return Promise.map(views, (filePath) => {
      let src = path.join(distPath, '/client', filePath)
      let dist = path.join(distPath, '/server', filePath)
      console.log('src:', src)
      console.log('dist:', dist)
      return fs.moveAsync(src, dist)
    })

  }).then(() => {
    let duration = (Date.now() - start)/1000
    console.log(`compile process done in ${duration.toFixed(2)}s`)
})
