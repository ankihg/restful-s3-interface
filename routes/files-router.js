'use strict';
module.exports = (router, models, awsManager, fileManager) => {

  let File = models.File;

  router.route('/files/:username/:filename')
  .get((req, res) => {
    File.find({url:req.params.username+'/'+req.params.filename}, (err, file) => {
      if (err) return res.status(500).send(err);
      if (!file.length) return res.status(400).send(`file ${req.params.username}/${req.params.filename} does not exist`);
      return res.status(200).json(file[0]).end();
    });
  })
  .put((req, res) => {
    File.find({url:req.params.username+'/'+req.params.filename}, (err, files) => {
      if (err) return res.status(500).send(err);
      if (!files.length) return res.status(400).send(`file ${req.params.username}/${req.params.filename} does not exist`);
      var file = files[0];

      fileManager.makeFile(req.body, (err, data) => {
        if (err) return res.status(500).send(err);

        awsManager.uploadFile({name:req.params.username}, {name: req.body.name, content:data}, () => {

          file.update({name:req.body.name, url:req.params.username+'/'+req.body.name}, (err, file) => {
            if (err) return res.status(500).send('error updating file');
            return res.status(200).json(file).end();
          });
        });
      });
    });
  })
  .delete((req, res) => {
    File.find({url:req.params.username+'/'+req.params.filename})
    .remove()
    .exec((err) => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(200);
    });
  });

  router.route('/files/:username/:filename/content')
  .get((req, res) => {
    console.log('get content');
    File.find({url:req.params.username+'/'+req.params.filename}, (err, file) => {
      if (err) return res.status(500).send(err);
      if (!file.length) return res.status(400).send(`file ${req.params.username}/${req.params.filename} does not exist`);
      awsManager.getFile(req.params.username, req.params.filename, (err, file) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(file.Body.toString());
      });
    });
  });

};
