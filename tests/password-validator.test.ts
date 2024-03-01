import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  afterEach(() => {
    jest.restoreAllMocks();
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
});

function bypassIrrelevantPrivateMethodsForUseCase(useCaseMethod: string): void {
  const excludedMethodsForStubs = ["constructor", "execute"];
  const methodsForStubs = Reflect.ownKeys(PasswordValidator.prototype)
    .filter(
      (method) =>
        ![useCaseMethod, ...excludedMethodsForStubs].includes(method as string)
    )
    .map(String);
    
  methodsForStubs.forEach((method) => {
    jest
      .spyOn(PasswordValidator.prototype as any, method)
      .mockImplementation(() => true);
  });
}
