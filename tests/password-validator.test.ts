import { PasswordValidator } from "../src/password-validator";

describe("The password validator", () => {
  const irrelevantChar = "*";

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("checks if password complies with all rules", () => {
    const validPassword = "1234_ABCDabcd";
    const validator = new PasswordValidator();

    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks if password has the allowed minimum characters", () => {
    bypassIrrelevantPrivateMethodsForUseCase("hasMinimumLength");
    const minimumLength = 6;
    const incorrectLength = 5;
    const validPassword = irrelevantChar.repeat(minimumLength);
    const invalidPassword = irrelevantChar.repeat(incorrectLength);

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks if password contains at least one digit", () => {
    bypassIrrelevantPrivateMethodsForUseCase("hasDigit");
    const validPassword = `1${irrelevantChar}`;
    const invalidPassword = `a${irrelevantChar}`;

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks if password contains at least one upper case letter", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsUpperCaseLetter");
    const validPassword = `A${irrelevantChar}`;
    const invalidPassword = `a${irrelevantChar}`;

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks if password contains at least one lower case letter", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsLowerCaseLetter");
    const validPassword = `a${irrelevantChar}`;
    const invalidPassword = `A${irrelevantChar}`;

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });

  it("checks if password contains at least one underscore character", () => {
    bypassIrrelevantPrivateMethodsForUseCase("containsUnderscoreCharacter");
    const validPassword = `_${irrelevantChar}`;
    const invalidPassword = `*${irrelevantChar}`;

    const validator = new PasswordValidator();

    expect(validator.execute(invalidPassword)).toBe(false);
    expect(validator.execute(validPassword)).toBe(true);
  });
});

function bypassIrrelevantPrivateMethodsForUseCase(useCaseMethod: string): void {
  const methodsForStubs = Reflect.ownKeys(PasswordValidator.prototype)
    .filter(isMethodForStub)
    .map(String);

  methodsForStubs.forEach((method) => {
    const privateMethodSpy = jest.spyOn(
      PasswordValidator.prototype as any,
      method
    );
    privateMethodSpy.mockImplementation(() => true);
  });

  function isMethodForStub(method: string | symbol) {
    const excludedMethodsForStubs = ["constructor", "execute"];
    const methodName = method.toString();
    return ![useCaseMethod, ...excludedMethodsForStubs].includes(methodName);
  }
}
