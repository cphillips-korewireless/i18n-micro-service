const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const url = require('url');
const fs = require('fs');

// url: http://localhost:3000/
app.get('/', (request, response) => response.send('Hello World'));

// all routes prefixed with /api
app.use('/api', router);

// using router.get() to prefix our path
// url: http://localhost:3000/api/
router.get('/', (request, response) => {
  response.json({ message: 'Hello, welcome to my server' });
});

// set the server to listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));

// http://localhost:3000/api/lang?lang=es&appName=glass
router.get('/lang', (request, response) => {
  const parameters = url.parse(request.url, true).query;
  const language = parameters.lang;
  const appName = parameters.appName;
  let languageJson;
  fs.readFile(
    `apps/${appName}/languages/${language}.json`,
    'utf8',
    (err, data) => {
      if (err) {
        response.json({
          message: 'Language not found for the specified application.'
        });
      } else {
        languageJson = JSON.parse(data);
        response.json(languageJson);
      }
    }
  );
});
