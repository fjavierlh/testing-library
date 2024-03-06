import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  it("checks if password complies with all rules", () => {
    const validPassword = "1234_ABCDabcd";
    const validator = new PasswordValidator();

    expect(validator.validate(validPassword)).toBe(true);
  });

  it("checks if password has the allowed minimum characters", () => {
    const validPassword = "123_abC";
    const invalidPassword = "12_aB";

    const validator = new PasswordValidator();

    expect(validator.validate(invalidPassword)).toBe(false);
    expect(validator.validate(validPassword)).toBe(true);
  });

  it("checks if password contains at least one digit", () => {
    const validPassword = `1_abcD`;
    const invalidPassword = `abc_ABC`;

    const validator = new PasswordValidator();

    expect(validator.validate(invalidPassword)).toBe(false);
    expect(validator.validate(validPassword)).toBe(true);
  });

  it("checks if password contains at least one upper case letter", () => {
    const validPassword = "A_123ab";
    const invalidPassword = "a_123ab";

    const validator = new PasswordValidator();

    expect(validator.validate(invalidPassword)).toBe(false);
    expect(validator.validate(validPassword)).toBe(true);
  });

  it("checks if password contains at least one lower case letter", () => {
    const validPassword = "a_123AB";
    const invalidPassword = "A_123AB";

    const validator = new PasswordValidator();

    expect(validator.validate(invalidPassword)).toBe(false);
    expect(validator.validate(validPassword)).toBe(true);
  });

  it("checks if password contains at least one underscore character", () => {
    const validPassword = "1_abcD";
    const invalidPassword = "1*abcD";

    const validator = new PasswordValidator();

    expect(validator.validate(invalidPassword)).toBe(false);
    expect(validator.validate(validPassword)).toBe(true);
  });
});
