const express 	= require('express'),
	  cors		= require('cors');
var prices = require('./src/prices.js')

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/v1/prices', cors(), (req, res) => {
	prices()
	.then(d => res.json(d))
	.catch(err => console.log(err))
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
