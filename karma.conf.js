module.exports = function (config) {
  config.set({
    // Inside `karma.conf.js`
    // Define our custom launcher for Node.js support
    customLaunchers: {
      CustomElectron: {
        base: 'Electron',
        browserWindowOptions: {
          // DEV: More preferentially, should link your own `webPreferences` from your Electron app instead
          webPreferences: {
            // Preferred `preload` mechanism to expose `require`
            preload: __dirname + '/preload.js',

            // Alternative non-preload mechanism to expose `require`
            nodeIntegration: true,
            contextIsolation: false

            // nativeWindowOpen is set to `true` by default by `karma-electron` as well, see #50
          }
        }
      }
    },

    // Use our custom launcher
    browsers: ['CustomElectron'],

    // DEV: preprocessors is for backfilling `__filename` and local `require` paths
    preprocessors: {
      '**/*.js': ['electron']
    },

    // DEV: `useIframe: false` is for launching a new window instead of using an iframe
    //   In Electron, iframes don't get `nodeIntegration` priveleges yet windows do
    client: {
      useIframe: false,
      mocha: {timeout: 60000},
    },

    frameworks: ['mocha'],

    plugins: [require('karma-electron'), require('karma-mocha')],

    basePath: './',
    files: ['**/*.test.js'],

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
