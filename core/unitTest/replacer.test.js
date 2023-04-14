const replace = require('../utils/replacer.js');

test('Verify the replacer function with a correct value', () => {
  const value = 'test';
  const obtain = replace.replaceValue(`${value}`, this);
  expect(obtain).toBe(value);
});

test('Verify the replacer function without parameters', () => {
  const obtain = replace.replaceValue();
  expect(obtain).toBeUndefined();
});
