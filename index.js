'use strict';
let express = require('express');
let app = express();

// Ignore requests for favicons
app.get('/favicon.ico', function(req, res) {
  res.sendStatus(404);
});

app.use('/findPerson', require('/middleware/findPerson'));
app.use('/findRoom', require('/middleware/findRoom'));
app.use('/checkInOut', require('/middleware/checkInOut'));
app.use('/screenConnect', require('/middleware/screenConnect'));

app.listen(3000);
