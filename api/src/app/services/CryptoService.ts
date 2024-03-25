import * as crypto from 'node:crypto';

class CryptoService {
  private algorithm: string;
  private key: Buffer;

  constructor() {
    this.algorithm = 'aes-256-cbc';
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error('SecretKey is not defined in the environment variables');
    }

    this.key = Buffer.from(secretKey, 'hex');
  }

  encrypt(data: string, id?: string) {
    try {
      if (!id) {
        id = crypto.randomUUID();
      }

      const cipher = crypto.createCipheriv(this.algorithm, this.key, id.slice(0, 16));

      let encryptedData = cipher.update(data, 'utf-8', 'hex');
      encryptedData += cipher.final('hex');

      return { id, encryptedData };
    } catch (err) {
      throw new Error('Invalid secret key');
    }
  }

  decrypt(encryptedData: string, id: string) {
    return new Promise((resolve) => {
      try {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, id.slice(0, 16));
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        resolve(decryptedData);
      } catch (err) {
        throw new Error('Invalid secret key');
      }
    });
  }
}

export default CryptoService;
