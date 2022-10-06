const mongoose = require('mongoose'); //importing modules
const uniqueValidator = require('mongoose-unique-validator') //prevents creation of new user with the same email adresse

const userSchema = mongoose.Schema({ //creates the schema - 0bject with user info
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);