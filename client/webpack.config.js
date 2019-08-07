const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

const { devServerConfig } = require('./package.json');

module.exports = (env, options) => {
    const isDev = options.mode === 'development';
    return {
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        devtool: isDev ? 'source-map' : 'eval-source-map',
        output: {
            publicPath: '/'
        },
        optimization: isDev ? {
            minimize: false
        } : {
            minimize: true,
            nodeEnv: 'production',
            removeAvailableModules: true,
            mergeDuplicateChunks: true,
            occurrenceOrder: true,
            mangleWasmImports: true,
            removeEmptyChunks: true,
            providedExports: true,
            usedExports: true,
            concatenateModules: true,
            runtimeChunk: {
                name: entrypoint => `runtime~${entrypoint.name}`
            },
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    // sourceMap: true,
                    terserOptions: {
                        ie8: false,
                        safari10: false,
                        keep_classnames: true
                    }
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: { minimize: true }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                strictMath: false,
                                noIeCompat: true,
                                javascriptEnabled: true
                            }
                        }
                    ],
                    include: [
                        path.resolve(__dirname, './src'),
                        path.resolve(__dirname, './node_modules')
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            })
        ],
        devServer: {
            contentBase: [path.join(__dirname, './public'), path.join(__dirname, './dist')],
            inline: true,
            compress: true,
            host: devServerConfig.host,
            port: devServerConfig.port,
            proxy: devServerConfig.proxy,
            open: devServerConfig.open,
            historyApiFallback: true
        }
    };
};
