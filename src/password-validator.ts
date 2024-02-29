export class PasswordValidator {
  public execute(password: string): boolean {
    const minimumPasswordLength = 6;
    return password.length >= minimumPasswordLength;
  }
}
