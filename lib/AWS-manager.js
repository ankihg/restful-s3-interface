'use strict';
const AWS = require('aws-sdk');
AWS.config.update({accessKeyId:process.env.AWS_ACCESS_KEY_ID, secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY});
AWS.config.update({region:'us-west-2'});

let AWSmanager = function() {
  this.s3 = new AWS.S3();
};

AWSmanager.prototype.makeBucket = function(username, next) {
  //  var bucket = this.s3.createBucket({Bucket: 'imlowercase'}, function() {});
  //  console.log('HERE IS THE BUCKET');
  //  console.log(bucket);
  var s3bucket = new AWS.S3({params: {Bucket: username}});
  s3bucket.createBucket(() => {
    console.log('bucket created');
    console.log(s3bucket);
    if (next) next();
  });
};

AWSmanager.prototype.uploadFile = function(user, file, next) {
  var params = {Bucket: user.name, Key: file.name, Body: file.content};

  this.s3.putObject(params, function(err, data) {
      if (err) {
        console.log('got error');
        console.log(this.httpResponse.body.toString());
        console.log('now error print');
        console.log(err);
      }
      else {
        console.log(`successful upload to ${user.name}/${file.name}`);
        if (next) next();
      }
   });
};

AWSmanager.prototype.getFile = function(username, filename, next) {
  var params = {Bucket: username, Key: filename};
  this.s3.getObject(params, next);
};

module.exports = AWSmanager;


  // var params = {Bucket: 'imlowercase', Key: 'keytoo', Body: 'Hello!'};
  //
  // s3.putObject(params, function(err, data) {
  //     if (err) {
  //       console.log('got error');
  //       console.log(this.httpResponse.body.toString());
  //       console.log('now error print');
  //       console.log(err);
  //     }
  //     else console.log("Successfully uploaded data to myBucket/myKey");
  //  });
