import { BrowserWindow, app, dialog } from 'electron';
import createLogger from './core/logger';
import { registerIPCMainHandlers } from './ipc-main';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const logger = createLogger('app');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  registerIPCMainHandlers();

  return createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

process.on('uncaughtException', error => {
  const { name, message } = error;
  logger.error('uncaughtException', error);
  return dialog.showErrorBox('An error occurred', `${name}: ${message}`);
});
