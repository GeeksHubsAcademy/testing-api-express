const nonMultipleOf3or5 = require('./nonMultipleOf3or5');

describe('should work', () => {
  test("it shouldn't be multiple of 3", () => {
    expect(nonMultipleOf3or5(76) % 3).not.toBe(0);
  });
  test("it shouldn't be multiple of 5", () => {
    expect(nonMultipleOf3or5(88) % 5).not.toBe(0);
  });
});
