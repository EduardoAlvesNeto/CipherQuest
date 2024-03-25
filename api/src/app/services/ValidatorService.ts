class ValidatorService {
  static isValidDocument(document: string) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    return regex.test(document);
  }
}

export default ValidatorService;
