'use strict';
const mongoose = require('mongoose');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let models = {};


require(__dirname + '/File.js')(mongoose, models);
require(__dirname + '/User.js')(mongoose, models);

module.exports = models;
