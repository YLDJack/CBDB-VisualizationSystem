const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
    entry: {
       app:'/src/app.jsx',
       vendor: [
           'react',
           'antd',
           'axios',
           'react-dom',
           'react-router',
           'jquery'
       ]
    },
    output:{
        // path:path.resolve(__dirname, './dist/'),
        // path:path.resolve('C:/wamp64/www/path/'),
        // filename:'[name].[chunkhash:6].js'
        path:'/dist', //打包后的文件存放的地方
        filename:'bundle.js',
        publicPath:'http://localhost:8080/dist/'
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
    mode: 'production',
    module:{
        rules:[
            {oneof : [{
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react']
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }]}
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].[chunkhash:6].css"),
        new CleanWebpackPlugin(
            ['path'],
            {
                root: 'C:/wamp64/www/',
                verbose: true,
                dry:   false
            }
        ),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename:'vendor.js'
        })
    ],
};


// 获取指定路径下的入口文件
function getEntries(globPath) {
    const files = glob.sync(globPath),
        entries = {};
    console.log(files)
    files.forEach(function(filepath) {
        const split = filepath.split('/');
        const name = split[split.length - 2];
        entries[name] = './' + filepath;
    });
    return entries;
}

const entries = getEntries('src/**/index.js');

Object.keys(entries).forEach(function(name) {
    webpackConfig.entry[name] = entries[name];
    const plugin = new HtmlWebpackPlugin({
        filename: name + '.html',
        template: './public/index.html',
        inject: true,
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
})

module.exports = webpackConfig;