const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "switch-procon-input-viewer",
      filename: "index.html",
      template: "src/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react"
              ]
            }
          }
        ]
      }
    ]
  },
};
