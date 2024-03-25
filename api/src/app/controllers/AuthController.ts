import { Request, Response, NextFunction } from 'express';

import AuthRepository from '../repositories/AuthRepository';
import ValidatorService from '../services/ValidatorService';
import { BadRequestError } from '../helpers/ErrorHandler';

class AuthController {
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await AuthRepository.signIn({ email, password });

      res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { document, email, password } = req.body;

      if (!document) throw new BadRequestError('Invalid document');
      if (!email) throw new BadRequestError('Invalid email');
      if (!password) throw new BadRequestError('Invalid password');

      // if (!ValidatorService.isValidDocument(document)) throw new BadRequestError('Invalid document');

      await AuthRepository.create({ document, email, password });

      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new AuthController();
