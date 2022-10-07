const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = (req, res, next) => { //Save the new model 'user' to the data base MongoDB
  bcrypt.hash  (req.body.passwod, 10)
  .then(hash => {
    const user = new User({ //creates new user
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  })

  .catch(error => res.status(500).json({error}));

};
  

exports.login = (req, res, next) => { //Save the new model 'user' to the data base MongoDB
    delete req.body._id; // exclude the field ID to the collection saved to the date base Mongo DB
    
    User.findOne({ email: req.body.email, password: req.body.password })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

  }