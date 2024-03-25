import { Request, Response, NextFunction } from 'express';

import CreditCardRepository from '../repositories/CreditCardRepository';
import { BadRequestError } from '../helpers/ErrorHandler';

class CreditCardController {
  async getAllCreditCards(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;

      const data = await CreditCardRepository.findAllByUserId(userId);

      res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { name, number, expiration, cvv } = req.body;

      if (!name) throw new BadRequestError('Invalid name');
      if (!number) throw new BadRequestError('Invalid number');
      if (!expiration) throw new BadRequestError('Invalid expiration');
      if (!cvv) throw new BadRequestError('Invalid cvv');

      await CreditCardRepository.create({ name, number, expiration, cvv, userId });

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { id } = req.params;
      const { name, number, expiration, cvv } = req.body;

      if (!id) throw new BadRequestError('Invalid id');
      if (!name) throw new BadRequestError('Invalid name');
      if (!number) throw new BadRequestError('Invalid number');
      if (!expiration) throw new BadRequestError('Invalid expiration');
      if (!cvv) throw new BadRequestError('Invalid cvv');


      await CreditCardRepository.update({ id, userId, name, number, expiration, cvv });

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId;
      const { id } = req.params;

      if (!id) throw new BadRequestError('Invalid id');

      await CreditCardRepository.delete(userId, id);

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default new CreditCardController();
