const path = require('path');

const extensions = [".tsx", ".ts", ".js"];

const tsReactRule = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {
          "runtime": "automatic"
        }],
        "@babel/preset-typescript",
      ],
    },
  },
};

const alias = {
  '@': path.resolve(__dirname, 'src'),
};

module.exports = {
  tsReactRule,
  alias,
  extensions,
};
