module.exports = {
  entry: './index.ts',
  // output: {
  //   filename: 'dist/bundle.js'
  // },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  }
}