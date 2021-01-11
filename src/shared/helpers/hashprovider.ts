import { hash, compare } from 'bcryptjs';

export const generateHash = async (payload: string) => {
  return hash(payload, 8);
};

export const compareHash = async (payload: string, hashed: string) => {
  return compare(payload, hashed);
};
