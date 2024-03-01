export class PasswordValidator {
  minimumPasswordLength = 6;

  public execute(password: string): boolean {
    return [
      this.hasMinimumLength(password),
      this.hasDigit(password),
      this.containsUpperCaseLetter(password),
      this.containsLowerCaseLetter(password),
      this.containsUnderscoreCharacter(password),
    ].every(Boolean);
  }

  private hasMinimumLength(password: string): boolean {
    return password.length >= this.minimumPasswordLength;
  }

  private hasDigit(password: string): boolean {
    return /\d/.test(password);
  }

  private containsUpperCaseLetter(password: string): boolean {
    return password !== password.toLowerCase();
  }

  private containsLowerCaseLetter(password: string): boolean {
    return password !== password.toLocaleUpperCase();
  }

  private containsUnderscoreCharacter(password: string): boolean {
    return password.includes("_");
  }
}
