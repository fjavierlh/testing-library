describe("Use case", () => {
  beforeAll(() => {
    console.log("Before all test");
  });

  beforeEach(() => {
    console.log("Before each test");
  });

  beforeEach(() => {
    console.log("Before each test");
  });

  afterEach(() => {
    console.log("After each test");
  });

  afterAll(() => {
    console.log("After all test");
  });

  test("should do something 1", () => {
    console.log("Test 1");
    expect(true).toBe(true);
  });

  test("should do something 2", () => {
    console.log("Test 2");
    expect(true).toBe(true);
  });
});
