const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/Gateway',
    createProxyMiddleware({
      target: 'http://13.68.144.88',
      changeOrigin: true,
    })
  );
};