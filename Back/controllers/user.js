const bcrypt = require('bcrypt'); //import the variable that manage the password hash
const jwt = require('jsonwebtoken'); //import jwt variable that manage the token
const User = require('../models/User'); //Import User variable from models

exports.signup = (req, res, next) => { //Save the new model 'user' to the data base MongoDB
  bcrypt.hash  (req.body.password, 10)
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
                  token: jwt.sign(
                    { userId: user._id },
                    'RADOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                  )
              });
            })
            .catch(error => res.status(500).json({ error }));
          })
      .catch(error => res.status(500).json({ error }));
   };