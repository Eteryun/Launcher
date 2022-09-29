import { getNameFromUrl } from '@common/utils/file';
import os from 'os';
import path from 'path';

import { getArch, getPlatform } from './os';
import { libraryPath } from './path';
import { getSettings } from './settings';

const settings = getSettings();

export const checkRules = (rules: Version.Rule[]) => {
  let isAllow = true;

  for (const rule of rules) {
    const allow = rule.action === 'allow';
    let osCheck = true;
    let features = true;
    if (rule.os) {
      const { name, arch, version } = rule.os;

      const isOs = name ? name === getPlatform() : true;
      const isArch = arch ? arch === getArch() : true;
      const isVersion = version ? new RegExp(version).test(os.release()) : true;

      osCheck = isOs && isArch && isVersion;
    }

    if (rule.features?.has_custom_resolution) {
      if (settings.resolution.width == 0 || settings.resolution.height == 0)
        features = false;
    }

    if (rule.features?.is_demo_user) features = false;

    if (rule.features) {
      if (!allow && features) isAllow = false;
      else if (allow && features) isAllow = true;
      else if (allow && !features) isAllow = false;
    } else {
      if (!allow && osCheck) isAllow = false;
      else if (allow && osCheck) isAllow = true;
      else if (allow && !osCheck) isAllow = false;
    }
  }

  return isAllow;
};

export const getNativeArtifact = (library: Version.Library) => {
  if (library.natives && library.downloads.classifiers) {
    const native = library.natives[getPlatform()] as
      | 'natives-windows'
      | 'natives-osx'
      | 'natives-linux';

    return library.downloads.classifiers[native];
  }

  return null;
};

export const parseArtifactPath = (
  libraryName: string,
  artifact: Server.Artifact,
) => {
  if (artifact.path) return path.join(libraryPath, artifact.path);
  else {
    let nameSplit = libraryName.split(':');
    nameSplit = nameSplit.map((part, index) =>
      index != nameSplit.length - 1 ? part.replaceAll('.', '/') : part,
    );
    return path.join(
      libraryPath,
      nameSplit.join('/'),
      getNameFromUrl(artifact.url),
    );
  }
};
