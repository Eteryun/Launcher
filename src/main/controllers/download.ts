import { Logger } from '@main/classes/logger';
import { ParallelDownloader } from '@main/classes/parallelDownloader';
import { getFilesFromServer } from '@main/utils/file';
import fs from 'fs';

import { mainWindow } from '..';

let downloader: ParallelDownloader;
const logger = Logger.getLogger('DOWNLOAD');

const start = async (server: Distro.Server) => {
  try {
    logger.info(
      `Iniciando download do servidor "${server.name} ${server.version}" versão do minecraft usada: ${server.minecraft.version}`,
    );
    logger.debug(`Iniciando download do servidor ${JSON.stringify(server)}`);
    let files = await getFilesFromServer(server);

    files = files.filter((file) => !fs.existsSync(file.artifact.path));

    if (files.length === 0) {
      setTimeout(() => {
        mainWindow?.webContents.send('download/finished');
      }, 500);
      return {};
    }

    downloader = new ParallelDownloader(files);
    downloader.start();

    downloader.on('progress', (data) => {
      if (data.percentage % 1 < 0.5)
        mainWindow?.webContents.send('download/progress', data);
    });

    downloader.on('error', (data) => {
      logger.error(
        'Erro ao tentar baixar arquivo.',
        '\nArquivo:',
        data.file.name,
        `\n${data.error}`,
      );
      mainWindow?.webContents.send('download/error', data);
    });

    downloader.on('finished', () =>
      mainWindow?.webContents.send('download/finished'),
    );

    return {};
  } catch (error) {
    logger.error(
      `Erro ao tentar realizar download do servidor "${server.name} ${server.version}"\n`,
      error,
    );
    return { error };
  }
};

export const pause = () => {
  downloader?.pause();
};

export const resume = () => {
  downloader?.resume();
};

export const abort = () => {
  downloader?.abort();
};

export const DownloadController = {
  start,
  pause,
  resume,
  abort,
};
