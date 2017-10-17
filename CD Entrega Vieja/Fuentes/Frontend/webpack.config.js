var webpack = require("webpack");
var PROD = 1;

module.exports = {
  entry: {
    "vendor": "./src/vendor",
    "app": "./src/main"
  },
  output: {
    path: __dirname,
    filename: PROD ? './src/dist/[name].bundle.min.js' :"./src/dist/[name].bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    PROD ? new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }    })
        : new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js"),

  ]
}
