export interface IPayloadToken {
  id: string;
  fullname: string;
  email: string;
  role: string;
  status: string;
  iat?: number;
  exp?: number;
}
