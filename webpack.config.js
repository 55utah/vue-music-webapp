const webpack = require('webpack')
const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const DIST_PATH = path.resolve('./')


const config = {
    mode:'development',
    entry:'./src/main.js',
    output:{
        path:DIST_PATH,
        filename:'build.js',
        publicPath:'/'
    },
    resolve:{
        extensions:['.js','.css', '.vue'], //自动拓展文件后缀名
    },
    module:{
        rules:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules/,
            query:{
                presets:['es2015']
            }
        },{
            test:/\.css$/,
            loader:'style-loader!css-loader!postcss-loader'
        },{
            test: /\.(ttf|eot|svg|woff2?)/,
            loader: 'url-loader'
        },{
            test: /\.(png|jpg|gif|mp3|m4a)$/,
            loader: 'file-loader'
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        host: '172.0.0.1',
        port: 2433,
        contentBase: DIST_PATH,
        historyApiFallback: true,
        inline:true
    }
}


module.exports = config