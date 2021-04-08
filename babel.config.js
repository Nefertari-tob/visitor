const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
let plugins = [
  [
    "import",
    {
      libraryName: "ant-design-vue",
      libraryDirectory: "es",
      style: true
    }
  ],
  [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
    }
  ]
];
if (IS_PROD) {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/app"],
  plugins
};
