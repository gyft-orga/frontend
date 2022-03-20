const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "dist/bundle.js"
  },
  devServer: {
    port: 3000,
    historyApiFallback: true, // cf: https://dev.to/tylermcginnis/fixing-the-cannot-get-url-error-on-refresh-with-react-router-or-how-client-side-routers-work-4ho9
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.join(__dirname, 'dist'),
      },
    ],
    hot: true
  },
};
