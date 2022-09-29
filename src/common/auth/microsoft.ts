import { parserAxiosError } from '@common/utils/errors';
import { keysToCamelCase } from '@common/utils/strings';
import axios from 'axios';

const clientId = '6bfd5487-f049-48d8-b886-bd8b0263f27e';
const authAuthorize =
  'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize';
const authToken = 'https://login.live.com/oauth20_token.srf';
export const authRedirect =
  'https://login.microsoftonline.com/common/oauth2/nativeclient';

const createCommonQueries = (): { [k: string]: string } => ({
  client_id: clientId,
  grant_type: 'authorization_code',
  redirect_uri: authRedirect,
  scope: 'XboxLive.signin offline_access',
});

export const createUrl = () => {
  const query = createCommonQueries();
  query['response_type'] = 'code';
  query['prompt'] = 'select_account';
  query['cobrandid'] = '8058f65d-ce06-4c30-9559-473c9275a65d';

  return authAuthorize + '?' + new URLSearchParams(query);
};

export const getToken = async (code: string) => {
  const query = createCommonQueries();
  query['code'] = code;

  try {
    const response = await axios.post(authToken, new URLSearchParams(query), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return keysToCamelCase(response.data) as Microsoft.AuthResponse;
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};

export const refreshToken = async (refreshToken: string) => {
  const query = createCommonQueries();
  query['refresh_token'] = refreshToken;
  query['grant_type'] = 'refresh_token';

  try {
    const response = await axios.post(authToken, new URLSearchParams(query), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return keysToCamelCase(response.data) as Microsoft.AuthResponse;
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};
