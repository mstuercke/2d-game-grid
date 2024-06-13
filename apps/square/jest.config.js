module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/*.test.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  collectCoverageFrom: ["**/*.ts", "!**/*.{fixture,mock}.ts", "!**/index.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
