import { Request, Response, NextFunction } from 'express';

import UserRepository from '../repositories/UserRepository';
import { BadRequestError } from '../helpers/ErrorHandler';

class UserController {
  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.userId;

      if (!id) throw new BadRequestError('Invalid id');

      const data = await UserRepository.findById(id);

      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;

      await UserRepository.delete(userId);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
