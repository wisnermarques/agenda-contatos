const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adicione esta linha
    viewportWidth: 1280, // Adicione estas linhas
    viewportHeight: 720,
    screenshotOnRunFailure: false, // Desativa screenshots automáticos
    specPattern: "cypress/e2e/**/*.feature",
    stepDefinitions: "cypress/e2e/steps/**/*.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});