import prisma from '../database';
import { NotFoundError } from '../helpers/ErrorHandler';
import CreditCardService from '../services/CreditCardService';
import CryptoService from '../services/CryptoService';

interface ICreditCard {
  id?: string;
  name: string;
  number: string;
  expiration: string;
  cvv: number;
  userId: string
}

class CreditCardRepository {
  private readonly Crypto: CryptoService;

  constructor() {
    this.Crypto = new CryptoService();
  }

  async findAllByUserId(userId: string) {
    const data = await prisma.creditCard.findMany({ where: { user_id: userId } });

    const decryptedData = await Promise.all(data.map(async (card) => {
      const decryptedNumber = await this.Crypto.decrypt(card.number, card.id);
      return {
        ...card,
        number: decryptedNumber
      };
    }));

    return decryptedData;
  }
  async create(data: ICreditCard) {
    const cardBrand = CreditCardService.getBrandOfCard(data.number);

    const encryptedData = this.Crypto.encrypt(data.number);

    return await prisma.creditCard.create({
      data: {
        id: encryptedData.id,
        name: data.name,
        number: encryptedData.encryptedData,
        brand: cardBrand,
        expiration: data.expiration,
        cvv: data.cvv,
        user_id: data.userId
      }
    });
  }

  async update(data: ICreditCard) {
    const card = await prisma.creditCard.findFirst({ where: { id: data.id } });

    if (!card) throw new NotFoundError('Card not found');

    const cardBrand = CreditCardService.getBrandOfCard(data.number);

    const encryptedNumber = this.Crypto.encrypt(data.number, data.id);

    return await prisma.creditCard.update({
      where: { id: card.id, AND: { user_id: data.userId } },
      data: {
        name: data.name,
        number: encryptedNumber.encryptedData,
        brand: cardBrand,
        expiration: data.expiration,
        cvv: data.cvv,
      }
    });

  }

  async delete(userId: string, id: string) {
    const creditCard = await prisma.creditCard.findFirst({
      where: {
        id, AND: {
          user_id: userId
        }
      }
    });

    if (!creditCard) throw new NotFoundError('CreditCard not found');

    await prisma.creditCard.delete({
      where: {
        id, AND: {
          user_id: userId
        }
      }
    });

    return;
  }
}

export default new CreditCardRepository();
