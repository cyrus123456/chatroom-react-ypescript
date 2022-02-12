const { createProxyMiddleware } = require('http-proxy-middleware');  // 注意写法，这是1.0以后的版本，最好按抄

module.exports = (app) => {
  app.use(createProxyMiddleware('/goApi',
    {
      target: 'http://127.0.0.1:8080',
      pathRewrite: {
        '^/goApi': '',
      },
      changeOrigin: true,
      secure: false, // 是否验证证书
      ws: true, // 启用websocket
    }
  ));
};