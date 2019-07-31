const nonMultiple = max => {
  const randomNumber = Math.round(Math.random() * max);

  const isMultipleOf3 = randomNumber % 3 === 0;
  const isMultipleOf5 = randomNumber % 5 === 0;

  return isMultipleOf3 || isMultipleOf5 ? nonMultiple(max) : randomNumber;
};

module.exports = nonMultiple;
