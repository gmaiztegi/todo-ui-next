const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

const config = {
  cssModules: true
};

module.exports = withTypescript(withSass(withCSS(config)));
