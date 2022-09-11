const jestConfig = {
  // Sync with ./tsconfig.json paths
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@controllers/(.*)': '<rootDir>/src/controllers/$1',
  }
};

export default jestConfig;