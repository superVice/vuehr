let proxyObj ={}
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:7777',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: proxyObj
    }
}
