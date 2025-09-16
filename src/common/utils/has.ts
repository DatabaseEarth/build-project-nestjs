import * as bcrypt from 'bcrypt';

export const hash = async (password: string, salts = 10) =>
  bcrypt.hashSync(password, salts);

export const compare = async (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
