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
     
    
exports.login = (req, res, next) => { //checks the data base MongoDB to find the user
  User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
      }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                      }
              res.status(200).json({
                  userId: user._id,
                  token: 'TOKEN'
              });
            })
            .catch(error => res.status(500).json({ error }));
          })
      .catch(error => res.status(500).json({ error }));
   };