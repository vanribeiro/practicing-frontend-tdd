module.exports = {
    clearMocks: true,
    testEnvironment: "node",
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
    globals: {
       TextEncoder: require("util").TextEncoder,
       TextDecoder: require("util").TextDecoder
   }
  };