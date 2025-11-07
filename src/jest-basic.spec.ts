describe('Jest Setup Test', () => {
  it('should be working', () => {
    expect(1 + 1).toBe(2);
  });

  it('should have Jest matchers available', () => {
    expect('hello world').toContain('world');
    expect([1, 2, 3]).toHaveLength(3);
    expect({ name: 'test' }).toHaveProperty('name');
  });
});