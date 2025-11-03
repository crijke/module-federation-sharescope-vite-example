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
  preview: {
    cors: true,
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
      library: { type: "window", name: "app1" },
      runtime: false,
      filename: "remoteEntry.js",
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      manifest: true,
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.0",
          shareScope: "react@18.3.0",
        },
        "@mui/material": {
          singleton: false,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.0",
        },
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
};
