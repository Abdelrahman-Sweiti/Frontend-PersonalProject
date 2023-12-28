const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://db.ygoprodeck.com',
      changeOrigin: true,
      secure: false,  // Disable certificate validation for local development
    })
  );
};
