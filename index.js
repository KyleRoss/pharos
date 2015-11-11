'use strict';
let express = require('express');
let app = express();
let initSocket = require('./socket');

app.set('port', (process.env.PORT || 3000));

// Ignore requests for favicons
app.get('/favicon.ico', function(req, res) {
  res.sendStatus(404);
});

app.use('/findPerson', require('./middleware/findPerson'));
app.use('/findRoom', require('./middleware/findRoom'));
app.use('/checkInOut', require('./middleware/checkInOut'));
app.use('/screenConnect', require('./middleware/screenConnect'));

let server = require('http').Server(app);
initSocket(server);

server.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
