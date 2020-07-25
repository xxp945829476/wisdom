const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const plugins = [
  [
    "import",
    { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
  ]
];
if (IS_PROD) {
  plugins.push("transform-remove-console");
};
module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: plugins
};
