import path from 'path';

import { getSettings } from './settings';

const settings = getSettings();

export const libraryPath = path.join(settings.basePath, 'common', 'libraries');
export const versionsPath = path.join(settings.basePath, 'common', 'versions');
export const instancesPath = path.join(settings.basePath, 'instances');
export const assetsPath = path.join(settings.basePath, 'common', 'assets');
export const runtimePath = path.join(settings.basePath, 'runtimes');

export const getIndexFilePath = (assetId: string) =>
  path.join(assetsPath, 'indexes', `${assetId}.json`);

export const getAssetObjectPath = () => path.join(assetsPath, 'objects');

export const getLogConfigFilePath = (configId: string) =>
  path.join(assetsPath, 'log_configs', configId);

export const getVersionJarPath = (id: string) =>
  path.join(versionsPath, id, `${id}.jar`);

export const getVersionJsonPath = (id: string) =>
  path.join(versionsPath, id, `${id}.json`);

export const getNativePath = (id: string) =>
  path.join(instancesPath, id, `natives`);
