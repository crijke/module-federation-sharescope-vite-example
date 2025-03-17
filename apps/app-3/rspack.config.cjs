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
      exposes: {
        "./export-app": "./src/export-app.tsx",
      },
      manifest: true,
      shareScope: "react@18.3.1",
      shared: {
        react: {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "18.3.1",
          shareScope: "react@18.3.1",
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: "6.1.0",
          shareScope: "react@18.3.1",
        },
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
};
