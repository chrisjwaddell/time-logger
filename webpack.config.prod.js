const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: "./src/scripts/utils.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'utils-webpack.js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        usedExports: true,
        minimize: false
    },
    devtool: "source-map",

    mode: "development"
}
