import path from 'path'
const root = path.join(__dirname, '../../../')
const projectPath = path.join(__dirname, '../')
const buildPath = path.join(root, 'build', path.basename(projectPath) )
const mode = process.env.NODE_ENV || 'development'

const config = {
  mode: mode,
  entry: {
    index: './index.js'
  },
  context: projectPath,
  output: {
    filename: '[name].[chunkhash:22].js',
    chunkFilename: '[name].[chunkhash:22].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      }

    ]
  }
}

export default config
