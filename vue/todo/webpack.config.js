const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin=require('html-webpack-plugin')
const webpack=require("webpack")
const isDev = process.env.NODE_ENV==='development'
const config={
    target:"web",
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(gif|png|jpg|svg|jpeg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl/,
                use: ['style-loader','css-loader','stylus-loader']
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'  //根据环境变量使用不同打包，
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool="#cheap-module-eval-source-map"
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true  //打印错误日志
        },
        hot:true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports=config