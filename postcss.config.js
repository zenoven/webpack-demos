module.exports = ({ file, options, env }) => {
  // console.log('env:', env, 'process.env.NODE_ENV:', process.env.NODE_ENV )
  return {
    plugins: {
      'postcss-import': { root: file.dirname },
      // 'postcss-cssnext': options.cssnext ? options.cssnext : false,
      'autoprefixer': env === 'production' ? options.autoprefixer : false,
      'cssnano': env === 'production' ? options.cssnano : false
    }
  }
}
