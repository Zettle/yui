const path = require('path');
const fs = require('fs');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir); // 原来的cli2是在build里面，这里就不需要回退了
}

console.log('==========');
console.log('NODE_ENV=', process.env.NODE_ENV);
console.log('==========');
const isAnalyzer = process.env.analyzer; // 是否是分析打包

const vueConfig = {
    publicPath: './', // 相对路径
    devServer: {
        host: '0.0.0.0'
    },
    chainWebpack: config => {
        config.resolve
            .alias // 别命名
            .set('@', resolve('./src'))
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('assets', resolve('src/assets'));
    },
    configureWebpack: config => {
        /**
         * 打包成gzip
         */
        const productionGzipExtensions = ['js', 'css'];
        config.plugins.push(new CompressionWebpackPlugin({
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }));

        if (isAnalyzer) {
            const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    },
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                data: fs.readFileSync('./src/assets/style/_variables.scss', 'utf-8')
            }
        }
    }
};
module.exports = vueConfig;
