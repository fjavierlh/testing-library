import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("checks if password complies with all rules", () => {
    const validPassword = "1234_ABCDabcd";
    const invalidPassword = "abcd-";

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks that a password has the allowed minimum characters", () => {
    bypassIrrelevantPrivateMethodsForUseCase("hasMinimumLength");
    const minimumLength = 6;
    const incorrectLength = 5;
    const validPassword = "*".repeat(minimumLength);
    const invalidPassword = "*".repeat(incorrectLength);

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks that a password contains at least one digit", () => {
    bypassIrrelevantPrivateMethodsForUseCase("hasDigit");
    const validPassword = "1";
    const invalidPassword = "a";

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks that a password contains at least one upper case letter", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsUpperCaseLetter");
    const validPassword = "A";
    const invalidPassword = "a";

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks that a password contains at least one lower case letter", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsLowerCaseLetter");
    const validPassword = "a";
    const invalidPassword = "A";

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks that a password contains at least one underscore character", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsUnderscoreCharacter");
    const validPassword = "_";
    const invalidPassword = "a";

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });
});

function bypassIrrelevantPrivateMethodsForUseCase(useCaseMethod: string): void {
  const excludedMethodsForStubs = ["constructor", "execute"];
  const methodsForStubs = Reflect.ownKeys(PasswordValidator.prototype)
    .filter(isMethodForStub)
    .map(String);

  methodsForStubs.forEach((method) => {
    jest
      .spyOn(PasswordValidator.prototype as any, method)
      .mockImplementation(() => true);
  });

  function isMethodForStub(method: string | symbol) {
    return ![useCaseMethod, ...excludedMethodsForStubs].includes(
      method.toString()
    );
  }
}
