declare namespace Xbox {
  type AuthResponse = {
    userHash: string;
    issueInstant: string;
    token: string;
    expireOn: Date;
  };
}
