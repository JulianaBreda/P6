const User = require('../models/user');

exports.createUser = (req, res, next) => { //Save the new model 'user' to the data base MongoDB
    delete req.body._id; // exclude the field ID to the collection saved to the date base Mongo DB
    const user = new User({ //creates new user
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.loginUser = (req, res, next) => { //Save the new model 'user' to the data base MongoDB
    delete req.body._id; // exclude the field ID to the collection saved to the date base Mongo DB
    
    User.findOne({ email: req.body.email, password: req.body.password })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

  }