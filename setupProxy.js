const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://192.168.1.128:5000',
      changeOrigin: true,
    })
  );
};