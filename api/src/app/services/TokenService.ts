import jwt, { Secret, TokenExpiredError } from 'jsonwebtoken';

import { BadRequestError, UnauthorizedError } from '../helpers/ErrorHandler';

interface TokenData {
  id: string
}

class TokenService {
  private static secretKey: Secret | undefined = process.env.JWT_SECRET;

  static createToken(data: TokenData) {
    try {

      if (!this.secretKey) throw new BadRequestError('Secret is not defined');

      const token = jwt.sign(data, this.secretKey, { expiresIn: '30m' });

      return token;
    } catch (err) {
      return err;
    }
  }

  static verifyToken(token: string) {
    try {
      if (!this.secretKey) throw new BadRequestError('Secret is not defined');

      const payload = jwt.verify(token, this.secretKey, { complete: true }).payload;

      return payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new UnauthorizedError('Token expired');
    }
  }
}

export default TokenService;
