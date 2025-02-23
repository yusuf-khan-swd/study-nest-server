import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string; id: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
