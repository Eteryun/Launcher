import axios from 'axios';
import path from 'path';

import { getArch, getPlatform } from './os';
import { runtimePath } from './path';

export const getRuntimePlatform = () => {
  const platform = getPlatform();
  const arch = getArch();

  return platform === 'windows'
    ? `windows-${arch}`
    : platform === 'osx'
    ? `mac-os${arch == 'arm64' ? '-arm64' : ''}`
    : `linux${arch == 'x84' ? 'linux-i386' : ''}`;
};

export const getJavaRuntimeManifest = async (runtimeName: Java.Runtimes) => {
  const allruntimes =
    'https://launchermeta.mojang.com/v1/products/java-runtime/2ec0cc96c44e5a76b9c8b7c39df7210883d12871/all.json';

  const { data } = await axios(allruntimes);

  const runtimes = data[getRuntimePlatform()][runtimeName];
  const runtime = runtimes[0];

  const { data: manifest } = await axios(runtime.manifest.url);
  return manifest as Java.Manifest;
};

export const parseFilesFromManifest = (
  runtime: Java.Runtimes,
  manifest: Java.Manifest,
) => {
  const names = Object.keys(manifest.files);

  const files: Server.File[] = [];

  for (const name of names) {
    const object = manifest.files[name];

    if (object.type == 'file' && object.downloads) {
      files.push({
        name: name,
        artifact: {
          sha1: object.downloads.raw.sha1,
          size: object.downloads.raw.size,
          url: object.downloads.raw.url,
          path: path.join(runtimePath, runtime, getRuntimePlatform(), name),
        },
      });
    }
  }

  return files;
};

export const getJavaExecutable = () => {
  switch (getPlatform()) {
    case 'osx':
      return 'jre.bundle/Contents/Home/bin/java';
    case 'linux':
      return 'bin/java';
    default:
      return 'bin/javaw.exe';
  }
};
