'use strict';
module.exports = (router, models) => {

  let User = models.User;

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
      if (matches.length) return res.status(200).send('username already exists. choose another');
       var newUser = new User(req.body);
       newUser.save((err, user) => {
         if (err) return res.status(500).send('error creating user');
         return res.status(200).json(user).end;
       });
    })

  });


};
