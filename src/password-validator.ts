export class PasswordValidator {
  public execute(password: string): boolean {
    return password.length >= 6;
  }
}
