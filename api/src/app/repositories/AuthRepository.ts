import prisma from '../database';
import { ConflictError, NotFoundError } from '../helpers/ErrorHandler';
import PasswordService from '../services/PasswordService';
import TokenService from '../services/TokenService';

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  email: string;
  password: string;
  document: string;
}

class AuthRepository {
  async signIn(data: ISignIn) {
    const user = await prisma.user.findFirst({ where: { email: data.email } });

    if (!user) throw new NotFoundError('User not found');

    const token = await TokenService.createToken({ id: user.id });

    return token;
  }

  async create(data: ISignUp) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { document: data.document }
        ]
      }
    });

    if (userAlreadyExists) throw new ConflictError('User already exists');

    const userName = data.email.substring(0, data.email.indexOf('@'));

    const encryptedPassword = await PasswordService.encryptPassword(data.password);

    await prisma.user.create({
      data: {
        name: userName,
        document: data.document,
        email: data.email,
        password: encryptedPassword
      }
    });
  }
}

export default new AuthRepository();
