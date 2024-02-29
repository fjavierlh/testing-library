import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  test("validate that a password has the minimum characters", () => {
    const validator = new PasswordValidator();
    expect(validator.execute("123456")).toBeTruthy();
  });
});
