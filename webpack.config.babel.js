import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = () => {
  let config = {};

  config = {
    entry: {
      main: './patterns/main.js',
      polyfills: './patterns/polyfills.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './public/js/'),
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader', 'eslint-loader'],
          exclude: [/node_modules/],
        },
        {
          test: /\.(woff2?|ttf|otf|eot)$/,
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/',
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
                outputPath: '../css/',
              },
            },
            { loader: 'extract-loader' },
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['node_modules/'],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new ExtractTextPlugin({ // define where to save the file
        filename: 'public/[name].bundle.css',
        allChunks: true,
      }),
    ],
  };

  // if (process.env.NODE_ENV === 'production') {
  //   config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  // }

  return config;
};
