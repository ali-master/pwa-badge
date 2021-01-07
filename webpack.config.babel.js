import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';

const { NODE_ENV } = process.env;
export default {
  entry: ['./src/index'],
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  optimization: {
    minimize: NODE_ENV === 'production',
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `pwa-badge${NODE_ENV === 'production' ? '.min' : ''}.js`,
    library: 'PWABadge',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ],
};
