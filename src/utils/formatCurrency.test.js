const { formatCurrency } = require('./formatCurrency');

test('formats currency correctly', () => {
  // The function returns a new object, so compare its values rather than object identity.
  expect(formatCurrency(10.005, 'USD')).toEqual({ amount: 10.01, currency: 'USD' });
});
