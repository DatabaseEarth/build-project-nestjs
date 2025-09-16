export interface PayloadToken {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  sessionId?: string | null;
  // ... :))
}

export interface TokenSession {
  accessToken: string;
  refreshToken: string;
}
