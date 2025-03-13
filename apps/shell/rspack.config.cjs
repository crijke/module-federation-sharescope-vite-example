const rspack = require('@rspack/core');
const path = require("path");
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

module.exports = {
    entry: {
        main: './src/main.tsx',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
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
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                                jsx: true,
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic',
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
            filename: "remoteEntry.js",
            remotes: {
                app1: {external: 'app1@http://localhost:5174/remoteEntry.js', shareScope: "react@18.3.0"},
                app2: {external: 'app2@http://localhost:5175/remoteEntry.js', shareScope: "react@18.3.0"},
                app3: {external: 'app3@http://localhost:5176/remoteEntry.js', shareScope: "react@18.3.1"}
            },
        }),
        new rspack.HtmlRspackPlugin({template: "index.html"}),
    ],
}
