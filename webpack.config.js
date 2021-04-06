const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {MiniCssExtractPlugin} =require('mini-css-extract-plugin')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        //__dirname 当前webpack.config.js 目录绝对路径
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,        //正则匹配文件
                //使用那些loader处理
                use: [
                    //创建style标签，将js中的样式插入进去，添加到head中生效 
                    'style-loader',
                    // MiniCssExtractPlugin.loader,
                    //将css文件变成commitjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                }
            },
            // {
            //     exclude:/\.(html|jpg|png|gif|js|less|css)/,
            //     loader:'file-loader',
            //     options:{
            //         name:'[hash:10].[ext]'
            //     }
            // }
            
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: './build/index.html',
        }),
        // new MiniCssExtractPlugin()
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        open: true,
        compress: true
    }
    // mode:'production',
}