const express = require('express'); 
const app = express(); //creates a new express instance - express object creates routes to be used
const mongoose = require('mongoose'); //import mongoose to the app file
const User = require('./models/user'); //import models/user to the app.js *************

//connect P6 to the data base mongooseATlas
mongoose.connect('mongodb+srv://julianabreda:Bidoncho1220@cluster0.yehlfob.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
  

app.use(express.json());//Read info return as POST

app.use((req, res, next) => { //global middleware - CORS - allows crossorigin exchange 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use(bodyParser.json());

app.post('/api/auth/signup', (req, res, next) => { //Save the new model 'user' to the data base MongoDB
    delete req.body._id; // exclude the field ID to the collection saved to the date base Mongo DB
    const user = new User({ //creates new user
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  /*app.use('/api/auth/signup', (req, res, next) => { //Save model to the data base
    User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
  });*/

  app.post('/api/auth/login', (req, res, next) => { //Save the new model 'user' to the data base MongoDB
    delete req.body._id; // exclude the field ID to the collection saved to the date base Mongo DB
    
    User.findOne({ email: req.params.email })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));

  });

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });  

module.exports = app;