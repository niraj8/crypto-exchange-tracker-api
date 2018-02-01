const express   = require('express'),
      cors      = require('cors'),
      prices    = require('./src/prices.js'),
      db        = require('./src/db.js');

const app = express();

app.get('/v1/prices', cors(), function (req, res) {
  db.one("SELECT data from prices ORDER BY time DESC")
  .then(d => res.json(d.data))
  .catch(err => console.log(err));
});

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
