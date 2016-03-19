var AWS = require('aws-sdk');
AWS.config.update({accessKeyId:process.env.AWS_ACCESS_KEY_ID, secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY});
AWS.config.update({region:'us-west-2'});

var s3 = new AWS.S3();

 s3.createBucket({Bucket: 'imlowercase'}, function() {


  var params = {Bucket: 'imlowercase', Key: 'keytoo', Body: 'Hello!'};

  s3.putObject(params, function(err, data) {
      if (err) {
        console.log('got error');
        console.log(this.httpResponse.body.toString());
        console.log('now error print');
        console.log(err);
      }
      else console.log("Successfully uploaded data to myBucket/myKey");
   });

});
