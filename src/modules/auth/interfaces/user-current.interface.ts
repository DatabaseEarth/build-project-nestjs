import { UserStatus } from '@common';

export interface IUserCurrent {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  address: string | null;
  mobile: string | null;
  birthday: string | null;
  role: string | null;
  status: UserStatus;
}
