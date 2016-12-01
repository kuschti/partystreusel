export default {
  output: {
    filename: 'application.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
