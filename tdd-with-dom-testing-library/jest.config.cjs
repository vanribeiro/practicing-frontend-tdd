module.exports = {
    clearMocks: true,
    testEnvironment: "node",
    setupFilesAfterEnv: ['./setupTests.js'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
    globals: {
       TextEncoder: require("util").TextEncoder,
       TextDecoder: require("util").TextDecoder
   }
};