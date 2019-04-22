module.exports = {
  roots: ['tests'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 95,
      lines: 100,
      statements: 100
    }
  },
  transformIgnorePatterns: ['node_modules'],
  transform: { '^.+\\.(tsx|js)?$': 'babel-jest' }
};
