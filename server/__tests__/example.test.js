const sum = (a, b) => a + b;

test('if I sum 4 and 5 it should return 9', () => {
  const result = sum(4, 5);
  expect(result).toBe(9);
});
