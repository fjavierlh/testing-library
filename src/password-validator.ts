export class PasswordValidator {
  public validate(password: string): boolean {
    return pipe(
      this.hasMinimumLength,
      this.hasDigit,
      this.containsUpperCaseLetter,
      this.containsLowerCaseLetter,
      this.containsUnderscoreCharacter
    )(password);
  }

  private hasMinimumLength(password: string): boolean {
    const minimumPasswordLength = 6;
    return password.length >= minimumPasswordLength;
  }

  private hasDigit(password: string): boolean {
    return /\d/.test(password);
  }

  private containsUpperCaseLetter(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  private containsLowerCaseLetter(password: string): boolean {
    return /[a-z]/.test(password);
  }

  private containsUnderscoreCharacter(password: string): boolean {
    return password.includes("_");
  }
}

function pipe(...validationFns: Function[]): Function {
  return (password: string) =>
    validationFns.reduce(
      (isValid, validate) => validate(password) && isValid,
      true
    );
}
