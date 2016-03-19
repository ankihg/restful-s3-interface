module.exports = (mongoose, models) => {

  const fileSchema = new mongoose.Schema({
    name: String,
    url: String
  });

  models.File = mongoose.model('File', fileSchema);
};
