import 'dayjs/locale/pt-br';

import dayjs from 'dayjs';
import { app, autoUpdater, BrowserWindow, dialog, ipcMain } from 'electron';
import os from 'os';
import path from 'path';

import { Logger } from './classes/logger';
import { CheckController } from './controllers/check';
import { DownloadController } from './controllers/download';
import { GameController } from './controllers/game';
import { MicrosoftController, microsoftWindow } from './controllers/microsoft';
import { ServerController } from './controllers/server';
import { getSettings, setSettings } from './utils/settings';

if (require('electron-squirrel-startup')) app.quit();

dayjs.locale('pt-br');

export let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 576,
    frame: false,
    transparent: true,
    icon: path.join(
      __dirname,
      '..',
      '..',
      process.env.NODE_ENV === 'development' ? 'assets' : '../assets',
      'icon.png',
    ),
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: process.env.NODE_ENV === 'development',
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (process.env.NODE_ENV === 'development')
    mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
    microsoftWindow?.close();
  });
};

const registerListeners = async () => {
  ipcMain.on('window/minimize', () => mainWindow?.minimize());
  ipcMain.on('window/close', () => mainWindow?.close());

  ipcMain.handle('microsoft/login', MicrosoftController.openLogin);
  ipcMain.handle('microsoft/auth', (_, code: string) =>
    MicrosoftController.authenticate(code),
  );
  ipcMain.handle('microsoft/refresh', (_, code: string) =>
    MicrosoftController.authenticate(code, true),
  );

  ipcMain.handle('server/status', (_, data) =>
    ServerController.getStatus(data),
  );

  ipcMain.handle('download/start', (_, data) => DownloadController.start(data));
  ipcMain.on('download/pause', () => DownloadController.pause());
  ipcMain.on('download/resume', () => DownloadController.resume());
  ipcMain.on('download/abort', () => DownloadController.abort());

  ipcMain.on('check/start', (_, data) => CheckController.start(data));
  ipcMain.on('check/abort', () => CheckController.abort());

  ipcMain.handle('settings/get', () => getSettings());
  ipcMain.on('settings/set', (_, data) => setSettings(data));

  ipcMain.handle('os/ram', () => (os.totalmem() - 1000000000) / 1000000000);

  ipcMain.handle(
    'dialog/open',
    (_, data) => mainWindow && dialog.showOpenDialog(mainWindow, data),
  );

  ipcMain.handle('game/start', (_, data) => GameController.start(data));

  ipcMain.once('update/check', initUpdater);
};

app.on('ready', createWindow).whenReady().then(registerListeners);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const initUpdater = () => {
  const logger = Logger.getLogger('UPDATE');
  const server = 'https://update.electronjs.org';
  const feed = `${server}/Eteryun/Launcher/${
    process.platform
  }/${app.getVersion()}`;

  autoUpdater.setFeedURL({
    url: feed,
    headers: {
      'User-Agent': `${app.getName()}/${app.getVersion()} (${
        process.platform
      }: ${process.arch})`,
    },
  });

  autoUpdater.on('checking-for-update', () => {
    logger.info('Procurando por atualizações');
    if (mainWindow) mainWindow.webContents.send('update', 'checking');
  });
  autoUpdater.on('update-available', () => {
    logger.info('Atualização disponível, iniciando download.');
    if (mainWindow) mainWindow.webContents.send('update', 'available');
  });
  autoUpdater.on('update-not-available', () => {
    logger.info('Nenhuma atualização disponível.');
    if (mainWindow) mainWindow.webContents.send('update', 'not-available');
  });
  autoUpdater.on('error', (error) => {
    logger.error(`Erro ao buscar atualização. ${error}`);
    if (mainWindow) mainWindow.webContents.send('update', 'not-available');
  });
  autoUpdater.on(
    'update-downloaded',
    (event, releaseNotes, releaseName, updateUrl) => {
      logger.info('Iniciando instalação da atualização.', {
        event,
        releaseNotes,
        releaseName,
        updateUrl,
      });
      setTimeout(() => {
        autoUpdater.quitAndInstall();
      }, 3000);
    },
  );

  autoUpdater.checkForUpdates();
};
