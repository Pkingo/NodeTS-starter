const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { getIfUtils } =  require('webpack-config-utils');

const {
  NODE_ENV = 'production',
} = process.env;
const {ifDev, ifProd} = getIfUtils(NODE_ENV);

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  watch: ifDev(),
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    modules: [
			path.resolve(__dirname, './node_modules'),
			path.resolve(__dirname, './src'),
		],
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
					/node_modules/,
				],
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  optimization: ifProd({
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  }),
  externals: [nodeExternals()],
  plugins: ifDev([
    new WebpackShellPlugin({
      onBuildEnd: ['npm run run:dev']
    })
  ])
}