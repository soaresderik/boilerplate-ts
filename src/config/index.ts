export const jwtConfig = (() => {
  const secret = process.env.SECRET_TOKEN as string;

  if (!secret || !secret.length) throw new Error('SECRET_TOKEN not defined.');

  return {
    secret,
    expiresIn: '1d',
  };
})();
