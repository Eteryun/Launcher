import { getLibrariesFromServer, libraryToFile } from '@main/utils/file';
import { getNativeArtifact } from '@main/utils/library';
import { getNativePath } from '@main/utils/path';
import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

import { Logger } from './logger';

const logger = Logger.getLogger('NATIVE');

export class Natives {
  private server: Distro.Server;

  constructor(server: Distro.Server) {
    this.server = server;
  }

  extractNatives = async () => {
    const nativePath = getNativePath(this.server.id);
    fs.mkdirSync(nativePath, { recursive: true });

    const libraries = await getLibrariesFromServer(this.server);
    const nativesLibraries = libraries
      .filter((library) => getNativeArtifact(library))
      .map(libraryToFile);

    for (const library of nativesLibraries) {
      if (fs.existsSync(library.artifact.path)) {
        const zip = new AdmZip(library.artifact.path);
        const files = zip.getEntries();

        for (const file of files) {
          const exclude =
            (library.exclude || ['META-INF/']).filter(
              (exclusion) => file.entryName.indexOf(exclusion) > -1,
            ).length > 0;

          if (!exclude) {
            try {
              fs.writeFileSync(
                path.join(nativePath, file.entryName),
                file.getData(),
              );
            } catch (error) {
              logger.error(`Erro ao extrair a biblioteca nativa:\n${error}`);
            }
          }
        }
      }
    }

    return nativePath;
  };

  cleanNatives = () => {
    const nativePath = getNativePath(this.server.id);
    if (fs.existsSync(nativePath)) fs.rmSync(nativePath, { recursive: true });
  };
}
