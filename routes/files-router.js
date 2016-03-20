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
  });

};
