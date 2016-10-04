`use strict`;

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const jQuery = new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
});

//common config for both dev and prod builds
const common = {
    output: {
        path: path.join(__dirname, './build'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /(\.css|\.scss)/,
                loaders: ['style', 'css', 'sass?sourceMap']
            },
            {
                test: /\.woff2$|\.woff$|\.ttf$|\.eot$|\.svg$/,
                loader: "file"
            },
            {
                test:/\.jpe?g$|\.gif$|\.png$/,
                loader:"file"
            }
        ]
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ["", '.js', '.jsx', '.css', '.scss', '.json', '.jpg', '.jpeg']
    },
};


//config for dev server
let dev = {
    entry: ['webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        path.resolve('./index.js')
    ],
    output: {
        publicPath: 'http://localhost:3000/build/'
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), jQuery],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|build)/,

                loaders: ['react-hot', 'babel']
            }
        ]
    }

};

//config for production build
let prod = {
    entry: path.resolve('./index.js'),
    output: {
        publicPath: './build/'
    },
    plugins:[jQuery],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|build)/,

                loader: "babel",
            }

        ]
    }
};


let config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(prod, common);
        break;
    case 'start':
        config = merge(dev, common);
}

module.exports = validate(config);