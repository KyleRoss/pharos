'use strict';
let express = require('express');
let app = express();
let initSocket = require('./socket');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let compression = require('compression');

let db = mysql.createPool({
    host: 'rv-clt-dbhack01',
    user: 'hacker',
    password: 'hunter2',
    port: 3306
});

app.use(bodyParser.json());
app.use(compression());

app.set('port', (process.env.PORT || 3001));

// Ignore requests for favicons
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(404);
});

app.get('/health', function(req, res) {
    res.send('healthy!');
});

app.use('/employees', require('./middleware/employees')(db));
app.use('/locations', require('./middleware/locations')(db));
app.use('/web', require('./middleware/web')(db));

app.use('/app', require('./middleware/app')(db));

let server = require('http').Server(app);
initSocket(server);

server.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});
