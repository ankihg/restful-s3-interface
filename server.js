'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let router = new express.Router();

let models = require(__dirname + '/models');

const AWSmanager = require(__dirname + '/lib/AWS-manager.js');
let awsManager = new AWSmanager();

const FileManager = require(__dirname + '/lib/FileManager.js');
let fileManager = new FileManager();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

require(__dirname + '/routes/users-router.js')(router, models, awsManager, fileManager);

app.use(router);


app.listen(3000, () => console.log('server speaking.'));
