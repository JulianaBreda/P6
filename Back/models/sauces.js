const mongoose = require('mongoose'); //importing modules

const saucesSchema = mongoose.Schema({ //creates the schema - 0bject with sauce info
  sauce: { type: String, required: true },
  image: { type: File, required: true },
   
});

module.exports = mongoose.model('Sauces', saucesSchema);