const webpack = require("webpack");

module.exports = {
  webpack: {
    plugins: [
      new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] }),
      new webpack.ProvidePlugin({ process: ["process"] }),
    ],
    alias: {
      process: require.resolve("process"),
      stream: require.resolve("stream-browserify"),
    },
    resolve: {
      fallback: {
        process: require.resolve("process"),
        stream: require.resolve("stream-browserify"),
      },
    },
  },
};
