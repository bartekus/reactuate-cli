const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackPluginTypescriptDeclarationBundler = require('webpack-plugin-typescript-declaration-bundler');

const include = path.resolve(__dirname, 'src');
const libraryName = process.env.npm_package_name;
const minimize = process.env.npm_lifecycle_event.split('.')[1] === 'min';

module.exports = {
  mode: minimize ? 'production' : 'development',
  target: 'node',
  context: path.resolve(__dirname),
  devtool: 'source-map',
  entry: {
    [libraryName]: path.resolve('src/cli.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "[name].js",
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          output: {
            comments: false,
          },
          sourceMap: true,
        },
      }),
    ],
    occurrenceOrder: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      minSize: 200 * 1024 * 1024,
    },
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new WebpackPluginTypescriptDeclarationBundler({
      moduleName: `"${libraryName}"`,
      out: './cli.d.ts',
    }),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include,
        resolve: {
          extensions: ['.js', '.ts'],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include
      },
    ]
  },
};
