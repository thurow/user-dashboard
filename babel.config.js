module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }]
      ]
    },
  },
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
    ["@babel/preset-typescript", {
      onlyRemoveTypeImports: true
    }]
  ],
}
