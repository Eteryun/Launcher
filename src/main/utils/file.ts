import { getNameFromUrl } from '@common/utils/file';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { getJavaRuntimeManifest, parseFilesFromManifest } from './java';
import { checkRules, getNativeArtifact, parseArtifactPath } from './library';
import { getAssetObjectPath, instancesPath } from './path';
import {
  getAssetsIndex,
  getClientFromManifest,
  getLoggingFromManifest,
  getManifestFromArtifact,
} from './version';

export const getFileSha1 = (path: string) => {
  if (!fs.existsSync(path)) return '';
  const buffer = fs.readFileSync(path);
  const hash = crypto.createHash('sha1');
  hash.update(buffer);

  return hash.digest('hex');
};

export const libraryToFile = (library: Version.Library): Server.File => {
  const artifact = getNativeArtifact(library) || library.downloads.artifact;

  if (artifact) {
    return {
      name: getNameFromUrl(artifact.url),
      exclude: library.extract?.exclude,
      artifact: {
        ...artifact,
        path: parseArtifactPath(library.name, artifact),
      },
    };
  }

  return {} as Server.File;
};

export const assetToFile = (
  name: string,
  asset: { hash: string; size: number },
): Server.File => {
  const resourcesUrl = 'https://resources.download.minecraft.net/';
  const hashName = asset.hash.substring(0, 2) + '/' + asset.hash;

  return {
    name: getNameFromUrl(name),
    artifact: {
      sha1: asset.hash,
      size: asset.size,
      url: `${resourcesUrl}${hashName}`,
      path: path.join(getAssetObjectPath(), hashName),
    },
  };
};

export const getLibrariesFromServer = async (server: Distro.Server) => {
  const manifest = await getManifestFromArtifact(server);

  const libraries = manifest.libraries.filter((library) =>
    library.rules ? checkRules(library.rules) : true,
  );
  libraries.push(
    ...server.libraries.filter((library) =>
      library.rules ? checkRules(library.rules) : true,
    ),
  );

  return libraries;
};

export const getFilesFromServer = async (server: Distro.Server) => {
  const manifest = await getManifestFromArtifact(server);
  const assetIndex = await getAssetsIndex(manifest);
  const runtimeManifest = await getJavaRuntimeManifest(
    manifest.javaVersion.component,
  );
  const libraries = manifest.libraries.filter((library) =>
    library.rules ? checkRules(library.rules) : true,
  );
  libraries.push(
    ...server.libraries.filter((library) =>
      library.rules ? checkRules(library.rules) : true,
    ),
  );

  const files = server.files
    .filter((library) => (library.rules ? checkRules(library.rules) : true))
    .map((file) => {
      file.artifact.path = path.join(
        instancesPath,
        server.id,
        file.artifact.path,
      );
      return file;
    });
  files.push(...libraries.map(libraryToFile));
  files.push(
    ...Object.keys(assetIndex.objects).map((key) =>
      assetToFile(key, assetIndex.objects[key]),
    ),
  );
  files.push(
    ...parseFilesFromManifest(manifest.javaVersion.component, runtimeManifest),
  );
  files.push(getClientFromManifest(manifest));
  files.push(getLoggingFromManifest(manifest));

  return files;
};
