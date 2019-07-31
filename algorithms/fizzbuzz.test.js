const fizzbuzz = require('./fizzbuzz');
const nonMultipleOf3or5 = require('./nonMultipleOf3or5');
describe('fizzbuzz', () => {
  test('it should return un array if and argument is a number', async () => {
    expect(Array.isArray(await fizzbuzz(2))).toBe(true);
  });
  test('it should return un array if and argument is a string that can be parsed to number', async () => {
    expect(Array.isArray(await fizzbuzz('2'))).toBe(true);
  });
  test('it should reject the promise if is run with a non positive number',async  () => {

    const mock = jest.fn();
    await fizzbuzz(undefined).catch(mock);
    expect(mock).toHaveBeenCalled();

    await expect(fizzbuzz({})).rejects.toThrow();
    await expect(fizzbuzz([])).rejects.toThrow();
    await expect(fizzbuzz('asdsf')).rejects.toThrow();
    await expect(fizzbuzz(0)).rejects.toThrow();
    await expect(fizzbuzz(-1)).rejects.toThrow();
  });

  test('it should return an array of the same length that the argument', async () => {
    const randomNumber = Math.ceil(Math.random() * 10);
    const array = await fizzbuzz(randomNumber);
    expect(array.length).toBe(randomNumber);
  });
  test('the position multiple of three should contain fizz', async () => {
    const randomNumber = Math.ceil(Math.random() * 10) * 3;
    const array = await fizzbuzz(randomNumber);
    expect(array[randomNumber - 1]).toMatch('fizz');
  });
  test('the position multiple of five should contain buzz', async () => {
    const randomNumber = Math.ceil(Math.random() * 10) * 5;
    const array = await fizzbuzz(randomNumber);
    expect(array[randomNumber - 1]).toMatch('buzz');
  });
  test('the position multiple of five and three should contain fizzbuzz', async () => {
    const randomNumber = Math.ceil(Math.random() * 10) * 5 * 3;
    const array = await fizzbuzz(randomNumber);
    expect(array[randomNumber - 1]).toBe('fizzbuzz');
  });
  test('the position non multiple of five or three should this number', async () => {
    const randomNumber = nonMultipleOf3or5(99);
    const array = await fizzbuzz(randomNumber);
    expect(array[randomNumber - 1]).toBe(String(randomNumber));
  });
});
