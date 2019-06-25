module.exports = {
  devtool: "(none)",
  mode: "development",
  watch: true,
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: `${__dirname}/dist`
  }
};
