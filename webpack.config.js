const webpack = require('webpack');
const glob = require('glob');
const { resolve } = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置 nodejs 环境变量 
//process.env.NODE_ENV = 'development';

const webpackConfig = {
    entry: {
       app:'/src/app.jsx',
    },
    output:{
        // path:path.resolve(__dirname, './dist/'),
        // path:path.resolve('C:/wamp64/www/path/'),
        // filename:'[name].[chunkhash:6].js'
        //打包后的文件存放的地方
        filename:'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build/js'),
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
    mode: 'production',
    module:{
        rules:[
            {
             oneof : [
             {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react']
                },
                // 开启 babel 缓存 
                // 第二次构建时，会读取之前的缓存
                cacheDirectory: true
             },
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: [MiniCssExtractPlugin.loader,"css-loader"]})
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
            }]
             },
             {
                 test: /\.(jpg|png|gif)$/,
                 // 使用一个 loader 
                 // 下载 url-loader file-loader
                 loader: 'url-loader',
                 options:{
                     // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
                      // 解析时会出问题：[object Module] 
                     // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
                    esModule: false,
                    // 给图片进行重命名 
                    // [hash:10]取图片的 hash 的前 10 位 
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]'
                 },
             },
             {
                test: /\.html$/,
                // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）
                loader: 'html-loader'
             },
             // 打包其他资源(除了 html/js/css 资源以外的资源)
             {
                 // 排除 css/js/html 资源
                 exclude: /\.(css|js|html|less)$/, 
                 loader: 'file-loader', 
                 options: { name: '[hash:10].[ext]' }
             }
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
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
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