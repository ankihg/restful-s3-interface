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
      awsManager.uploadFile({name:req.params.username}, file, () => {
        console.log('update complete');
        return res.status(200).send('updated');
      });
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
