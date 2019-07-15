const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      require: true
  },
  name: {
      type: String,
      required: true
  },
  avatar: {
      type: String
  }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

//   static function
userSchema.statics.uploadedAvatar =  multer({storage: storage}).single('avatar');
// current avatar path need to be available publicly for user model 
// e can call User.avatarPath from controller
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;



