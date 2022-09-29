declare namespace Minecraft {
  type AuthResponse = {
    username: string;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
  };

  type ProfileResponse = {
    id: string;
    name: string;
  };
}
