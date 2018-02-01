var db      = require('./src/db')
var prices  = require('./src/prices')

prices()
.then(d => {
  return db.none("INSERT INTO prices (time,data) VALUES(${time}, ${data:json})", {
    time: 'now',
    data: d
  })
})
.catch(err => console.log(err));