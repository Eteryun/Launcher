import { parserAxiosError } from '@common/utils/errors';
import { keysToCamelCase } from '@common/utils/strings';
import axios from 'axios';

const authAuthorize =
  'https://api.minecraftservices.com/authentication/login_with_xbox';
const authProfile = 'https://api.minecraftservices.com/minecraft/profile';

export const getAuthorization = async (userHash: string, xboxToken: string) => {
  try {
    const response = await axios.post(authAuthorize, {
      identityToken: `XBL3.0 x=${userHash};${xboxToken}`,
    });
    return keysToCamelCase(response.data) as Minecraft.AuthResponse;
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};

export const getProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(authProfile, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data as Minecraft.ProfileResponse;
  } catch (error) {
    throw new Error(parserAxiosError(error));
  }
};
