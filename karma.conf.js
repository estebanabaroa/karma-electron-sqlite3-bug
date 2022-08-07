module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    client: {
      mocha: {timeout: 60000},
      useIframe: false,
    },
    plugins: [require('karma-electron'), require('karma-mocha')],

    basePath: './',
    files: ['**/*.test.js'],

    customLaunchers: {
      CustomElectron: {
        base: 'Electron',
        browserWindowOptions: {
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: require('path').resolve(__dirname, 'preload.js'),
          },
          show: false,
        },
      },
    },
    browsers: ['CustomElectron'],

    singleRun: true,
    autoWatch: false,
    port: 9371,
    colors: true,
    logLevel: config.LOG_INFO,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 5,
  })
}
