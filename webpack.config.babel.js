import webpack from 'webpack';

module.exports = (gulpConfig) => {
  const config = {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
        },
      ],
    },
    resolve: {
      extensions: ['', '.js'],
    },
    plugins: [],
  };

  if (!gulpConfig.dev) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
    );
  }

  return config;
};
