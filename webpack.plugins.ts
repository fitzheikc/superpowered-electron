import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve(__dirname, 'superpowered-lib'), to: path.resolve(__dirname, '.webpack/renderer', 'superpowered-lib') },
      { from: path.resolve(__dirname, 'static-server', 'main.js'), to: path.resolve(__dirname, '.webpack/main', 'static-server', 'main.js') }
    ]
  })
];
