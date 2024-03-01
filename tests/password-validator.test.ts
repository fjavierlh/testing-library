import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  const validPassword = "1_Abcd";
  const invalidPassword = "abcde";

  it.each`
    password           | expected
    ${validPassword}   | ${true}
    ${invalidPassword} | ${false}
  `(
    "checks that a password has the allowed minimum characters",
    ({ password, expected }) => {
      const validator = new PasswordValidator();
      expect(validator.execute(password)).toBe(expected);
    }
  );

  it.each`
    password           | expected
    ${validPassword}   | ${true}
    ${invalidPassword} | ${false}
  `(
    "checks that a password contains at least one digit",
    ({ password, expected }) => {
      const validator = new PasswordValidator();
      expect(validator.execute(password)).toBe(expected);
    }
  );
});
