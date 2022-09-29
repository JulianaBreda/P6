const express = require('express');
const app = express(); //creates a new express instance - express object cria rotas
const mongoose = require('mongoose'); //import mongoose to the app file
const User = require('./models/user.js'); //import models/user to the app.js

//connect P6 to the data base mongooseATlas
mongoose.connect('mongodb+srv://julianabreda:Bidoncho1220@cluster0.yehlfob.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
  

app.use(express.json());//read info return POST

app.use((req, res, next) => { //global middleware - CORS - allows crossorigin exchange 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/auth/signup', (req, res, next) => { //send the new model 'user' to the data base
    delete req.body._id;
    const user = new User({
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
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