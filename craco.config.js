const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: {
    plugins: [
      new Dotenv({
        "process.env.NODE_ENV": JSON.stringify("production"),
        safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      }),
    ],
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      return webpackConfig;
    },
  },
};
