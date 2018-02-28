const express = require('express');
const morgan = require('morgan');
const { dispatch } = require('./dispatcher');

const app = express();
app.use(express.json(), morgan('dev'));
app.route('/climateaction').post(dispatch);

module.exports = app.listen(process.env.PORT, () => {
  process.stdout.write(`Serving port: ${ process.env.PORT }\n`);
});
