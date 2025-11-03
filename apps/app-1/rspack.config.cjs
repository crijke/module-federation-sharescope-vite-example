const path = require("path");
const rspack = require("@rspack/core");
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
  output: {
    publicPath: "http://localhost:5174/",
    clean: true,
  },
  devServer: {
    port: 5174,
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
      name: "app1",
      dts: true,
      filename: "remoteEntry.js",
      shareScope: "react@18.3.0",
      exposes: {
        "./export-app": "./src/export-app.tsx",
        "./SimpleButton": "./src/SimpleButton.tsx",
      },
      manifest: true,
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
          version: "18.3.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
          version: "18.3.0",
        },
        "react/jsx-runtime": {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
          version: "18.3.0",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.0",
          version: "6.1.0",
        },
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
};
