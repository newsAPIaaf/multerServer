const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, `can't be empty`]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: {
      validator: function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      message: `{VALUE} is not a valid Email`
    },
    require: [true, `can't be empty`],
  },
  password : {
    type:String,
    required: [true, `can't be empty`]
  },
  status:  {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
},{
  timestamps: true
})

userSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } else {
    next();
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User