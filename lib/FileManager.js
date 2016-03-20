'use strict';
const fs = require('fs');
const storagePath = __dirname + '/../storage/';

let FileManager = function() {};

FileManager.prototype.makeFile = function(fileData, next) {
  writeFile(fileData, (err, path) => {
    if (err) return next(err);
    readFile(path, next);
  });
};

function writeFile(fileData, next) {
  var path = storagePath+fileData.name;
  fs.writeFile(path, fileData.content, (err) => {
    return next(err, path);
  });
};

function readFile(path, next) {
  fs.readFile(path, (err, data) => {
    if (err) return next(err, data);

    deleteFile(path, (err) => {
      return next(err, data);
    });
  });
};

function deleteFile(path, next) {
  fs.unlink(path, next);
};

module.exports = FileManager;
