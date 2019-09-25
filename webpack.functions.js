const nodeExternals = require("webpack-node-externals");

module.exports = {
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: "graphql-import-loader" }]
      }
    ]
  }
};
