import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encrypt = async (plainTextPassword: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
};

export const matchPassword = async (
  hashedPassword: string,
  plainTextPassword: string,
) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
