'use strict';

let jwt = require('express-jwt');
let config = require('../config');

module.exports = jwt({
  secret: new Buffer(
    config.jwt.secret,
    'base64'),
  audience: config.jwt.audience
});
