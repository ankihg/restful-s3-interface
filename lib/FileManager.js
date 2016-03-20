'use strict';
const fs = require('fs');

let FileManager = function() {
  this.storagePath = __dirname + '/../storage/';
};

FileManager.prototype.writeFile = function(fileData, next) {
  var path = this.storagePath+fileData.name;
  fs.writeFile(path, fileData.content, (err) => {
    if (next) return next(err, path);
    return console.log(err);
  });
};

FileManager.prototype.readFile = function(path, next) {
  fs.readFile(path, (err, data) => {
    if (err) return next(err, data);
    this.deleteFile(path, (err) => {
      return next(err, data);
    });
  });
};

FileManager.prototype.deleteFile = function(path, next) {
  fs.unlink(path, next);
};

module.exports = FileManager;
