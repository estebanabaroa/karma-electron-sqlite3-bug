const { app, BrowserWindow, Menu, Tray, screen: electronScreen, shell, dialog } = require('electron');
const path = require('path');

const browserWindowOptions = {
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

const createMainWindow = () => {
  let mainWindow = new BrowserWindow(browserWindowOptions);
  const startURL = `file://${path.join(__dirname, './index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', async () => {
    mainWindow.show()

    mainWindow.openDevTools();
    
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
