const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
const BASE_URL = process.env.NODE_ENV === 'production' ? '/manage/' : '/'
module.exports = {
    // Project deployment base
    // By default we assume your app will be deployed at the root of a domain,
    // e.g. https://www.my-app.com/
    // If your app is deployed at a sub-path, you will need to specify that
    // sub-path here. For example, if your app is deployed at
    // https://www.foobar.com/my-app/
    // then change this to '/my-app/'
    baseUrl: BASE_URL,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://49.4.30.212:8023/ ',
                target: 'http://47.75.46.225/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    },
    //多页面
    // pages: {
    //     index: {
    //         entry: './src/main.js',
    //         template: './src/index.html',
    //         filename: './src/index.html',
    //         title: '总后台',
    //     },
    //     agent: {
    //         entry: './src/pages/agent/index.js',
    //         template: './src/pages/agent/index.html',
    //         filename: './src/pages/agent/index.html',
    //         title: '代理后台',
    //     },
    //     business: {
    //         entry: './src/pages/business/index.js',
    //         template: './src/pages/business/index.html',
    //         filename: './src/pages/business/index.html',
    //         title: '业务后台',
    //     },
    // },
}



