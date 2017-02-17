import path from 'path';
import webpack from 'webpack';

module.exports = (gulpConfig, target) => {
  let config = {};

  if (target === 'streusel') {
    config = {
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
          },
        ],
      },
      resolve: {
        extensions: ['.js'],
      },
      plugins: [],
    };
  } else if (target === 'fabricator') {
    config = {
      entry: {
        'partystreusel/scripts/p': gulpConfig.src.scripts.fabricator,
      },
      output: {
        path: path.resolve(__dirname, gulpConfig.dest.assets),
        filename: '[name].js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|prism\.js)/,
          },
        ],
      },
      plugins: [],
      cache: {},
    };
  } else {
    config = {};
  }

  if (!gulpConfig.dev) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
    );
  }

  return config;
};
