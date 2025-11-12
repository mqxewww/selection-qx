const Encore = require("@symfony/webpack-encore");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .enableVueLoader()
  .enablePostCssLoader()

  /*
   * ENTRY CONFIG
   *
   * Each entry will result in one JavaScript file (e.g. app.ts)
   * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
   */
  .addEntry("app", "./assets/app.ts")
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.38";
  })
  .enableTypeScriptLoader();

module.exports = Encore.getWebpackConfig();
