import prisma from '../database';
import { NotFoundError } from '../helpers/ErrorHandler';

class UserRepository {
  async findAll() {
    const data = await prisma.user.findMany();

    if (data.length == 0) throw new NotFoundError('Empty');

    return data;
  }

  async findById(id: string) {
    const data = await prisma.user.findUnique({ where: { id } });

    if (!data) throw new NotFoundError('User not found');

    return data;
  }

  async delete(userId: string) {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundError('User not found');

    await prisma.creditCard.deleteMany({ where: { user_id: userId } });
    await prisma.user.delete({ where: { id: userId, AND: {} } });

    return;
  }
}

export default new UserRepository();
