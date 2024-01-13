const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://48q4795194.uicp.fun',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }),
        createProxyMiddleware('/kill', {
            target: 'https://110.42.190.185:8082/',
            changeOrigin: true,
            pathRewrite: { '^/kill': '' }
        })
    )
}
