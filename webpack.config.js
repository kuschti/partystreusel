import path from 'path';
import webpack from 'webpack';

module.exports = (gulpConfig) => {
  const config = {
    entry: {
      'partystreusel/scripts/p': gulpConfig.src.scripts.fabricator,
    },
    output: {
      path: path.resolve(__dirname, gulpConfig.dest, 'assets'),
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|prism\.js)/,
          loaders: ['babel'],
          presets: ['es2015', 'stage-2'],
        },
      ],
    },
    plugins: [],
    cache: {},
  };

  if (!gulpConfig.dev) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  return config;
};
