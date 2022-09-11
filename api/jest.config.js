module.exports = {
  // Sync with ./tsconfig.json paths
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    '^@controllers/(.*)': '<rootDir>/src/controllers/$1',
  },
};
