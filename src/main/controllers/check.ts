import { Logger } from '@main/classes/logger';
import { CheckerDownloader } from '@main/classes/parallelChecker';
import { getFilesFromServer } from '@main/utils/file';

import { mainWindow } from '..';

let checker: CheckerDownloader;
const logger = Logger.getLogger('DOWNLOAD');

const start = async (server: Distro.Server) => {
  try {
    logger.info(
      `Iniciando verificação do servidor "${server.name} ${server.version}" versão do minecraft usada: ${server.minecraft.version}`,
    );
    logger.debug(`Iniciando verificação do servidor ${JSON.stringify(server)}`);
    const files = await getFilesFromServer(server);

    checker = new CheckerDownloader(files);
    checker.start();

    checker.on('progress', (data) => {
      if (data.percentage % 1 < 0.5)
        mainWindow?.webContents.send('check/progress', data);
    });

    checker.on('aborted', (data) => {
      mainWindow?.webContents.send('check/aborted', data);
    });

    checker.on('finished', (data) =>
      mainWindow?.webContents.send('check/finished', data),
    );

    return {};
  } catch (error) {
    logger.error(
      `Erro ao tentar realizar verificação do servidor "${server.name} ${server.version}"\n`,
      error,
    );
    return { error };
  }
};

export const abort = () => {
  checker.abort();
};

export const CheckController = {
  start,
  abort,
};
