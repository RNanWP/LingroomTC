module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  testMatch: ["**/src/**/*.test.ts"],
  // Ignora a pasta de build 'dist'
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
