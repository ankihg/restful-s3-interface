'use strict';
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let router = new express.Router();

let models = require(__dirname + '/models');
