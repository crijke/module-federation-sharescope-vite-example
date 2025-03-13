const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');
const path = require("path");


module.exports = {
    entry: {
        main: './src/main.tsx',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    output: {
        publicPath: 'http://localhost:5175/',
        clean: true,
    },
    devServer: {
        port: 5175,
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
            name: 'app2',
            filename: 'remoteEntry.js',
            exposes: {
                './export-app': './src/export-app.tsx',
            },
            experiments: {
                federationRuntime: "hoisted",
                asyncStartup: true
            },
            shareScope: "react@18.3.0",
            manifest: true,
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '18.3.0',
                    shareScope: "react@18.3.0"
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '18.3.0',
                    shareScope: "react@18.3.0"
                },
                '@mui/material': {
                    singleton: false,
                    requiredVersion: '6.4.7',
                    shareScope: "react@18.3.0"
                },
            },
        }),
    ],
    optimization: {
        minimize: false,
    },
}
