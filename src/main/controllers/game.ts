/* eslint-disable no-async-promise-executor */
import { LaunchGame } from '@main/classes/launchGame';
import { Logger } from '@main/classes/logger';

const logger = Logger.getLogger('GAME');

const start = async ({
  server,
  session,
}: {
  server: Distro.Server;
  session: Auth.Session;
}) =>
  new Promise(async (resolve) => {
    let error = '';
    const gameStartRegex = /\[CDATA\[Sound engine started]]/;
    logger.info(
      `Iniciando "${server.name} ${server.version}" utilizando o usuário "${session.name}"`,
    );
    const launchGame = new LaunchGame(server, session);

    const child = await launchGame.getProgress();

    child.stdout.on('data', (data) => {
      if (gameStartRegex.test(data)) {
        resolve({});
      }
    });
    child.stderr.on('data', (data) => {
      error = data;
    });
    child.on('close', () => {
      if (error) {
        resolve({ error });
      } else {
        resolve({});
      }
    });
  });

export const GameController = { start };
