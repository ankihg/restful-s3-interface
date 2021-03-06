'use strict';
module.exports = (router, models, awsManager, fileManager) => {

  let User = models.User;
  let File = models.File;

  router.route('/users')
  .get((req, res) => {
    console.log('get all users');
    User.find({}, (err, users) => {
      if (err) return res.status(500).send('error reading users');
      return res.status(200).json(users).end();
    });
  })
  .post((req, res) => {
    console.log('post a user');
    User.find({name:req.body.name}, (err, matches) => {
      if (err) return res.status(500).send(err);
      if (matches.length) return res.status(200).send('username already exists. choose another');

      var newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) return res.status(500).send('error creating user');

        awsManager.makeBucket(user.name, () => res.status(200).json(user).end());
       });
    });
  });

  router.route('/users/:name')
  .get((req, res) => {
    console.log(`get user ${req.params.name}`);
    User.find({name:req.params.name}, (err, user) => {
      if (err) return res.status(500).send('error reading user '+req.params.name);
      if (!user[0]) return res.status(400).send(`user ${req.params.name} does not exist`);

      return res.status(200).json(user[0]).end();
    });
  })
  .put((req, res) => {
    console.log(`update user ${req.params.name}`);
    User.update({name: req.params.name}, req.body, (err, user) => {
      if (err) return res.status(500).send('error reading user '+req.params.name);
      return res.sendStatus(200);
    });
  })
  .delete((req, res) => {
    console.log(`delete user ${req.params.name}`);
    User.find({name:req.params.name})
    .remove((err) => {
      if (err) return res.status(500).send(`error remove user ${req.params.name}`);
      return res.sendStatus(200);
    });
  });

  router.route('/users/:name/files')
  .get((req, res) => {
    console.log(`get user ${req.params.name}s files`);
    User.find({name:req.params.name})
    .populate('files')
    .exec((err, user) => {
      if (err) return res.status(500).send(err);
      if (!user[0]) return res.status(400).send(`user ${req.params.name} does not exist`);
      return res.status(200).json(user[0].files).end();
      });
    })
  .post((req, res) => {
    User.find({name:req.params.name}, (err, match) => {
      if (err) return res.sendStatus(500).send(err);
      if (!match[0]) return res.status(400).send(`user ${req.params.name} does not exist`);
      var user = match[0];

      fileManager.makeFile(req.body, (err, data) => {
        if (err) res.status(500).send(err);

        awsManager.uploadFile(user, {name: req.body.name, content:data}, () => {

        var mongoFile = new File({name: req.body.name, url: user.name+'/'+req.body.name});
          mongoFile.save((err, file) => {
            if (err) return res.status(500).send('error creating file');

            user.update({$push: {"files": file}}, (err, user) => {
              if (err) return res.status(500).send('error updating user');
              return res.status(200).json(user).end();
            });
          });
        });
      });

    });
  });


};
