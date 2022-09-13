module.exports = {
  // Sync with ./tsconfig.json paths
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    '^@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '^@database/(.*)': '<rootDir>/src/database/$1',
  },
};
