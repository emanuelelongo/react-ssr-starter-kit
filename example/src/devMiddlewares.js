import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


export default function (baseConfig) {
  const config = {
    ...baseConfig,
    devtool: 'inline-source-map'
  }

  const compiler = webpack(config);

  return [
    webpackDevMiddleware(compiler, { noInfo: true, publicPath: '/public' }),
    webpackHotMiddleware(compiler)
  ];
}