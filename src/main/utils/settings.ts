import { app } from 'electron';
import fs from 'fs';
import path from 'path';

const defaultSetting = {
  minMemory: 2,
  maxMemory: 2,
  javaParameters: '',
  basePath: path.join(app.getPath('appData'), `.${app.getName()}`),
  closeLauncher: true,
  fullScreen: false,
  resolution: {
    width: 0,
    height: 0,
  },
};

export const getSettings = (): Launcher.Settings => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  if (fs.existsSync(settingsPath))
    return JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

  fs.writeFileSync(settingsPath, JSON.stringify(defaultSetting, null, 2));
  return defaultSetting;
};

export const setSettings = (data: Launcher.Settings) => {
  const settingsPath = path.join(app.getPath('userData'), 'settings.json');
  fs.writeFileSync(settingsPath, JSON.stringify(data, null, 2));
};
