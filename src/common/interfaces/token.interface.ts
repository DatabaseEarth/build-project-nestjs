export interface PayloadToken {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  sessionId?: string | null;
  iat?: number;
  exp?: number;
  // ... :))
}

export interface TokenSession {
  accessToken: string;
  refreshToken: string;
}
