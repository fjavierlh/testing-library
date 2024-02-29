import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  test("validate that a password has the allowed minimum characters", () => {
    const validator = new PasswordValidator();
    expect(validator.execute("123456")).toBeTruthy();
    expect(validator.execute("12345")).toBeFalsy();
  });
});
