module.exports = (mongoose, models) => {

  const userSchema = new mongoose.Schema({
    name: String,
    files: [{type:mongoose.Schema.Types.ObjectId, ref:'File'}]
  });

  models.User = mongoose.model('User', userSchema);
}
