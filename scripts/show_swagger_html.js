const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Quantum Bot API', version: '1.0.0' },
  },
  apis: ['./api/*.js'],
};

const specs = swaggerJsdoc(options);
let html = swaggerUi.generateHTML(specs);
const cdnBase = 'https://unpkg.com/swagger-ui-dist@5.30.3';

const htmlCdn = html
  .replace(/href="\.\/swagger-ui.css"/g, `href="${cdnBase}/swagger-ui.css"`)
  .replace(/href="swagger-ui.css"/g, `href="${cdnBase}/swagger-ui.css"`)
  .replace(/src="\.\/swagger-ui-bundle.js"/g, `src="${cdnBase}/swagger-ui-bundle.js"`)
  .replace(/src="swagger-ui-bundle.js"/g, `src="${cdnBase}/swagger-ui-bundle.js"`)
  .replace(/src="\.\/swagger-ui-standalone-preset.js"/g, `src="${cdnBase}/swagger-ui-standalone-preset.js"`)
  .replace(/src="swagger-ui-standalone-preset.js"/g, `src="${cdnBase}/swagger-ui-standalone-preset.js"`)
  .replace(/src="\.\/swagger-ui-init.js"/g, `src="${cdnBase}/swagger-ui-init.js"`)
  .replace(/src="swagger-ui-init.js"/g, `src="${cdnBase}/swagger-ui-init.js"`)
  .replace(/href="\.\/favicon-32x32.png"/g, `href="${cdnBase}/favicon-32x32.png"`)
  .replace(/href="\.\/favicon-16x16.png"/g, `href="${cdnBase}/favicon-16x16.png"`)
  .replace(/href="favicon-32x32.png"/g, `href="${cdnBase}/favicon-32x32.png"`)
  .replace(/href="favicon-16x16.png"/g, `href="${cdnBase}/favicon-16x16.png"`);

console.log(htmlCdn.split('\n').slice(0,60).join('\n'));
