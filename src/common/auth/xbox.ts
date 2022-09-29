import { parserAxiosError } from '@common/utils/errors';
import { keysToCamelCase } from '@common/utils/strings';
import axios from 'axios';

const userAuthenticate = 'https://user.auth.xboxlive.com/user/authenticate';
const xStsAuthorize = 'https://xsts.auth.xboxlive.com/xsts/authorize';
const relyingParty = 'rp://api.minecraftservices.com/';

export const parseResponse = (data: {
  [K: string]: unknown;
}): Xbox.AuthResponse => {
  const response = keysToCamelCase(data) as Xbox.AuthResponse;
  response.expireOn = data['NotAfter'] as Date;
  const displayClaims = data['DisplayClaims'] as {
    xui: {
      [K: string]: string;
    }[];
  };
  if (displayClaims) {
    const firstItem = displayClaims.xui[0];
    response.userHash = firstItem['uhs'];
  }

  return response;
};

export const exchangeRpsTicketForUserToken = async (rps: string) => {
  try {
    const response = await axios.post(
      userAuthenticate,
      {
        RelyingParty: 'http://auth.xboxlive.com',
        TokenType: 'JWT',
        Properties: {
          AuthMethod: 'RPS',
          SiteName: 'user.auth.xboxlive.com',
          RpsTicket: rps,
        },
      },
      {
        headers: {
          'x-xbl-contract-version': 0,
        },
      },
    );
    return parseResponse(response.data);
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};

export const exchangeTokensForXstsIdentity = async (token: string) => {
  try {
    const response = await axios.post(
      xStsAuthorize,
      {
        RelyingParty: relyingParty,
        TokenType: 'JWT',
        Properties: {
          UserTokens: [token],
          SandboxId: 'RETAIL',
        },
      },
      {
        headers: {
          'x-xbl-contract-version': 0,
        },
      },
    );
    return parseResponse(response.data);
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};
