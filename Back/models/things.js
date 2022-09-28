const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ //creates the schema - 0bject with user info
  email: { type: String, required: true },
  password: { type: String, required: true }, //consultar no front o nome do campo
  
});

module.exports = mongoose.model('Thing', thingSchema);