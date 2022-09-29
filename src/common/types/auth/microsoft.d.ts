declare namespace Microsoft {
  type AuthResponse = {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    scope: string;
    refreshToken: string;
    userId: string;
  };
}
