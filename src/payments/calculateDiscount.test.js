const { calculateDiscount } = require('./calculateDiscount');

test('applies no discount when percent is 0', () => {
  expect(calculateDiscount(100, 0)).toBe(100); // This passes
});

test('applies 10 percent discount correctly', () => {
  // The implementation correctly subtracts 10 percent, so the expected result must be 90.
  expect(calculateDiscount(100, 10)).toBe(90);
});
