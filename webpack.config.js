 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//   获取HTML-WEBPACK-PLUGIN参数的方法
var getHtmlConfig = function(name){
     return{
          template: './src/view/' + name +'.html',
          filename: 'view/' + name +'.html',
          inject: true,
          hash : true,
          chunks: ["common", name]
     }
}

// 环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';

var config = {
     entry: {
     	'common': ['./src/page/common/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/index.js']
     },
     output: {
         path: './dist',
         publicPath: '/dist',
         filename: 'js/[name].js'
     },
     externals:{
     	 'jquery' : 'window.jQuery'
     },
     module:{
     	  loaders:[
     	  { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader" )},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
     	  ]
     },
     plugins: [
          //  独立通用文件
     	new webpack.optimize.CommonsChunkPlugin({
     		name: 'common',
     		filename: 'js/base.js'
     	}),
          //cSS单独打包
     	new ExtractTextPlugin("css/[name].css"),
          //HTML模板处理
          new HtmlWebpackPlugin(getHtmlConfig('index')),
          new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]

 };   
 if ('dev' === WEBPACK_ENV) {
     config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 };
 module.exports = config; 