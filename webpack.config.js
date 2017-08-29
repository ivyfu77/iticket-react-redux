var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

const isPRODUCTION = process.env.NODE_ENV === 'production';
const isDEVELOPMENT = process.env.NODE_ENV === 'development';
let externals = {};

if(isPRODUCTION){
    console.log("production build");
    externals = 
        {
            // 'react' : "React",
            // 'react-dom': 'ReactDOM',
            // 'redux': 'createStore',
            // 'redux': 'applyMiddleware',
            // 'redux': 'combineReducers',
            // 'redux': 'compose',
            // 'react-redux': "Provider",
            // 'react-router': "ReactRouter",
            // 'react-router-dom': "Route",
            //'react-router-dom': "Switch",
            //'react-router-dom': "BrowserRouter",
            // 'algoliasearch':'algoliasearch'
        }
    var plugins = [
            new ExtractTextPlugin({
                filename: 'css/index.css',
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "js/vendor.bundle.js"
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true
                },
                comments: false
            }),
            new webpack.EnvironmentPlugin(['NODE_ENV'])
        ]
}else{
    console.log("development build")
    var plugins = [
            new ExtractTextPlugin({
                filename: 'css/index.css',
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "js/vendor.bundle.js"
            })
        ]
}

module.exports = {
    externals:  externals,
    entry: {
        app: ['babel-polyfill','./src/main.js', './src/styles/style.js'],
        vendor: ['redux-thunk', 'redux-logger'],
    },
    output: {
        path: './dist',
        filename: 'js/[name].js',
    },
    plugins: plugins,
    devtool: 'source-map',
    module: {
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets:['es2015','react', 'stage-1']
                }
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    plugins:['transform-decorators-legacy' ],
                    presets:['es2015','react','stage-1']
                }
            },
            {
                test: /.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use:[
                        {loader:'css-loader', options: {minimize: isPRODUCTION}},
                        {loader: 'postcss-loader'},
                        {loader: 'less-loader'}
                    ]
                })
            },
            {
                test: /.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        {loader: 'css-loader', options: {minimize: isPRODUCTION}}
                    ]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&publicPath=../&outputPath=fonts/'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?publicPath=../&outputPath=fonts/'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?publicPath=../&outputPath=imgs/',
                        {
                            loader: 'image-webpack-loader',
                            query:{
                                optipng:{
                                    optimizationLevel: 7
                                }
                            }
                        }
                    ],
                exclude: /node_modules/
            }
        ]
    },
}