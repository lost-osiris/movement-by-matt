const { resolve } = require('path')
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  devServer: {
    allowedHosts: 'all',
    client: {
      overlay: {
        errors: true,
        runtimeErrors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      stats: {
        chunkModules: false,
        chunks: false,
        colors: true,
        errorDetails: true,
        logging: 'info',
        modules: false,
        timings: true,
        warnings: true,
      },
    },
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      // 'Content-Security-Policy':
      //   "default-src 'self' https://accounts.google.com/gsi/client; frame-src self https://accounts.google.com/gsi/; ",
      // 'Cross-Origin-Opener-Policy': 'unsafe-none',
      // 'Cross-Origin-Embedder-Policy': 'unsafe-none',
      // 'Content-Security-Policy-Report-Only':
      //   'script-src https://accounts.google.com/gsi/client; ',
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
      },
    },
    static: resolve(__dirname, 'src/assets/'),
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()],
}
