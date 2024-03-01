export class PasswordValidator {
  public execute(password: string): boolean {
    const minimumPasswordLength = 6;
    const containsDigit = password.match(/\d/);

    return [containsDigit, password.length >= minimumPasswordLength].every(
      Boolean
    );
  }
}
