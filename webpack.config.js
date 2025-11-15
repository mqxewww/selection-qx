const Encore = require("@symfony/webpack-encore");
const { DefinePlugin } = require("webpack");
const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env.local" });

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("app", "./assets/app.ts")
  .enableVueLoader()
  .enableTypeScriptLoader()
  .enablePostCssLoader()
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.38";
  })
  .addPlugin(
    new DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(false),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      "process.env": {
        VUE_APP_API_URL: JSON.stringify(process.env.VUE_APP_API_URL),
      },
    }),
  )
  .addAliases({
    "~": path.resolve(__dirname, "assets"),
  });

module.exports = Encore.getWebpackConfig();
