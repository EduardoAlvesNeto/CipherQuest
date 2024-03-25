import bcrypt from 'bcrypt';

class PasswordService {
  static async encryptPassword(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  }

  static async comparePassword(password: string, encryptedPassword: string) {
    const comparedPassword = await bcrypt.compare(password, encryptedPassword);
    return comparedPassword;
  }
}

export default PasswordService;
