const withTM = require("next-transpile-modules")(["@romalms/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
});
