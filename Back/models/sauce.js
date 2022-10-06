const mongoose = require('mongoose'); //importing modules

const userSchema = mongoose.Schema({ //creates the schema - 0bject with sauce info
  sauce: { type: String, required: true },
  image: { type: File, required: true },
   
});

module.exports = mongoose.model('Sauce', sauceSchema);