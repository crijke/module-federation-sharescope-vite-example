const rspack = require("@rspack/core");
const path = require("path");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");

module.exports = {
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    port: 5173,
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      dts: { consumeTypes: true },
      filename: "remoteEntry.js",
      remotes: {
        app1: {
          external: "app1@http://localhost:5174/mf-manifest.json",
        },
        app2: {
          external: "app2@http://localhost:5175/mf-manifest.json",
        },
        app3: {
          external: "app3@http://localhost:5176/mf-manifest.json",
        },
      },
    }),
    new rspack.HtmlRspackPlugin({ template: "index.html" }),
  ],
};
