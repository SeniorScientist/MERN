const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: './dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/')
    }
  }
};