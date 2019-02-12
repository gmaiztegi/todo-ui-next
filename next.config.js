const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

require("dotenv").config();

const config = {
  cssModules: true,
  publicRuntimeConfig: {
    apiEndpoint: process.env.API_ENDPOINT
  },
  poweredByHeader: false
};

module.exports = withTypescript(withSass(withCSS(config)));
