const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');
const {
  handle400,
  handle404,
  handle500,
  handle422,
  handle405,
} = require('./errors/errorHandler');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, msg: 'Page not found' });
});
app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle405);
app.use(handle500);
module.exports = app;
