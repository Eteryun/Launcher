import { MicrosoftAuth, MinecraftAuth, XboxAuth } from '@common/auth';
import { Logger } from '@main/classes/logger';
import dayjs from 'dayjs';
import { BrowserWindow } from 'electron';

export let microsoftWindow: BrowserWindow | null = null;

const logger = Logger.getLogger('MICROSOFT AUTH');

const createWindow = async (url: string) => {
  if (microsoftWindow) return;
  microsoftWindow = new BrowserWindow({
    width: 1024,
    height: 576,
  });

  microsoftWindow.on('closed', () => {
    microsoftWindow = null;
  });

  microsoftWindow.removeMenu();
  microsoftWindow.loadURL(url);
};

const openLogin = () =>
  new Promise((resolve) => {
    createWindow(MicrosoftAuth.createUrl());

    microsoftWindow?.on('close', () => {
      resolve({
        error: 'NOT_FINISHED',
      });
    });

    microsoftWindow?.webContents.on('did-navigate', (_, url_) => {
      if (url_.startsWith(MicrosoftAuth.authRedirect)) {
        const url = new URL(url_);
        const params = new URLSearchParams(url.search);
        const query: { [k: string]: string } = {};

        params.forEach((value, key) => {
          query[key] = decodeURI(value);
        });

        resolve(query);

        microsoftWindow?.close();
      }
    });
  });

const authenticate = async (code: string, isRefresh = false) => {
  try {
    const microsoftAuth = isRefresh
      ? await MicrosoftAuth.refreshToken(code)
      : await MicrosoftAuth.getToken(code);

    const rpsResponse = await XboxAuth.exchangeRpsTicketForUserToken(
      `d=${microsoftAuth.accessToken}`,
    );

    const xstsResponse = await XboxAuth.exchangeTokensForXstsIdentity(
      rpsResponse.token,
    );

    const minecraftAuth = await MinecraftAuth.getAuthorization(
      rpsResponse.userHash,
      xstsResponse.token,
    );

    const minecraftProfile = await MinecraftAuth.getProfile(
      minecraftAuth.accessToken,
    );

    const session: Auth.Session = {
      id: minecraftProfile.id,
      name: minecraftProfile.name,
      accessToken: minecraftAuth.accessToken,
      expiresIn: dayjs().add(minecraftAuth.expiresIn, 's').toDate(),
      microsoft: {
        refreshToken: microsoftAuth.refreshToken,
        accessToken: microsoftAuth.accessToken,
        expiresIn: dayjs().add(microsoftAuth.expiresIn, 's').toDate(),
      },
    };

    return session;
  } catch (error) {
    logger.error('Erro ao tentar autenticar a microsoft\n', error);
    if (error instanceof Error) return { error: error.message };
    else return { error: error as string };
  }
};

export const MicrosoftController = {
  openLogin,
  authenticate,
};
