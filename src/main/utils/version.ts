import { getNameFromUrl } from '@common/utils/file';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

import { getFileSha1 } from './file';
import {
  getIndexFilePath,
  getLogConfigFilePath,
  getVersionJarPath,
  getVersionJsonPath,
} from './path';

export const getAssetsIndex = async (
  manifest: Version.Manifest,
): Promise<Version.AssetIndex> => {
  const { url, sha1, id } = manifest.assetIndex;
  const filePath = getIndexFilePath(id);

  if (sha1 === getFileSha1(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  const { data } = await axios(url, { responseType: 'stream' });

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  data.pipe(fs.createWriteStream(filePath));

  return await getAssetsIndex(manifest);
};

export const getManifestFromArtifact = async (
  server: Distro.Server,
): Promise<Version.Manifest> => {
  const { url, sha1 } = server.client.manifest;

  const version = getNameFromUrl(url, false);
  const filePath = getVersionJsonPath(version);

  if (sha1 === getFileSha1(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  const { data } = await axios(url, { responseType: 'stream' });

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  data.pipe(fs.createWriteStream(filePath));

  return await getManifestFromArtifact(server);
};

export const getLocalManifest = (id: string): Version.Manifest => {
  const filePath = getVersionJsonPath(id);

  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const getClientFromManifest = (
  manifest: Version.Manifest,
): Server.File => {
  const { client } = manifest.downloads;

  const filePath = getVersionJarPath(manifest.id);

  return {
    name: `${manifest.id}.jar`,
    artifact: {
      path: filePath,
      sha1: client.sha1,
      size: client.size,
      url: client.url,
    },
  };
};

export const getLoggingFromManifest = (
  manifest: Version.Manifest,
): Server.File => {
  const { file } = manifest.logging.client;

  const filePath = getLogConfigFilePath(file.id);

  return {
    name: file.id,
    artifact: {
      path: filePath,
      sha1: file.sha1,
      size: file.size,
      url: file.url,
    },
  };
};
