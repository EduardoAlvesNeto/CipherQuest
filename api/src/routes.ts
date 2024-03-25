import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import CreditCardController from './app/controllers/CreditCardController';

import AuthMiddleware from './app/middlewares/AuthMiddleware';

const router = Router();

//Auth routes
router.post('/auth/signin', AuthController.signIn);
router.post('/auth/signup', AuthController.signUp);

//User routes
router.get('/users', AuthMiddleware, UserController.getUserInfo);
router.delete('/users', AuthMiddleware, UserController.delete);

//CreditCard routes
router.get('/creditcards', AuthMiddleware, CreditCardController.getAllCreditCards);
router.post('/creditcards', AuthMiddleware, CreditCardController.store);
router.put('/creditcards/:id', AuthMiddleware, CreditCardController.update);
router.delete('/creditcards/:id', AuthMiddleware, CreditCardController.delete);

export default router;
