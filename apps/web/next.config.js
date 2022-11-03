const withTM = require("next-transpile-modules")(["@romalms/design-system"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "joeschmoe.io",
        port: "",
      },
    ],
  },
});
