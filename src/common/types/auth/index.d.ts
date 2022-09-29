declare namespace Auth {
  type Session = {
    id: string;
    name: string;
    accessToken: string;
    expiresIn: Date;
    microsoft: {
      refreshToken: string;
      accessToken: string;
      expiresIn: Date;
    };
  };
}
