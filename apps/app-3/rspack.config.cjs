const rspack = require("@rspack/core");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  output: {
    publicPath: "http://localhost:5176/",
    clean: true,
  },
  devServer: {
    port: 5176,
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
      name: "app3",
      filename: "remoteEntry.js",
      shareScope: "react@18.3.1",
      remotes: {
        app1: {
          external: "app1@http://localhost:5174/mf-manifest.json",
          shareScope: "react@18.3.0",
        },
      },
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      dts: true,
      manifest: true,
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
          version: "18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
          version: "18.3.1",
        },
        "react/jsx-runtime": {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
          version: "18.3.1",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.1",
          version: "6.1.0",
        },
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
};
