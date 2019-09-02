const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env, argv)  => {
    return {
        entry: "./src/index.js",
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'assets/js')
        },
        devtool: argv.mode === 'development' ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(tsx|ts)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        optimization: {
            minimizer: [
              new TerserPlugin({
                parallel: true,
                terserOptions: {
                  output: {
                    comments: false
                  },
                },
              }),
            ]
        },
        plugins: []
    };
};
