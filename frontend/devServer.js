`use strict`;

//server for hot-reloading of react components
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
});

server.listen(3000, 'localhost', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});
server.use('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
