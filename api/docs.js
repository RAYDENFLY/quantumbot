import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Quantum Bot API', version: '1.0.0' },
  },
  apis: [
    path.join(__dirname, 'signals.js'),
    path.join(__dirname, 'research.js'),
    path.join(__dirname, 'learning.js'),
    path.join(__dirname, 'academy.js'),
  ],
};

const specs = swaggerJsdoc(options);

// Return a minimal standalone HTML page that loads swagger-ui from CDN
// and initializes it with the generated spec inline. This avoids any
// server-side static asset serving issues and guarantees the browser
// can fetch the correct CSS/JS from the CDN.
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const specJson = JSON.stringify(specs);
  const cdnBase = 'https://unpkg.com/swagger-ui-dist@5.30.3';

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quantum Bot API Docs</title>
    <link rel="stylesheet" href="${cdnBase}/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="${cdnBase}/swagger-ui-bundle.js"></script>
    <script src="${cdnBase}/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = function() {
        const spec = ${specJson};
        const ui = SwaggerUIBundle({
          spec,
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          layout: 'StandaloneLayout'
        });
        window.ui = ui;
      };
    </script>
  </body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}