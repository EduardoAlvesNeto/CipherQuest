import { BadRequestError } from '../helpers/ErrorHandler';

class CreditCardService {
  static getBrandOfCard(number: string) {
    const cleanedNumber = number.replace(/\s+/g, '').replace(/-/g, '');

    const cardPatterns: { [key: string]: RegExp } = {
      'american': /^3[47][0-9]{13}$/,
      'visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
      'mastercard': /^5[1-5][0-9]{14}$/,
      'discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/
    };

    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleanedNumber)) {
        return type;
      }
    }

    throw new BadRequestError('Invalid card number');
  }
}

export default CreditCardService;
