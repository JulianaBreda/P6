const express = require('express'); 
const app = express(); //creates a new express instance - express object creates routes to be used
const mongoose = require('mongoose'); //import mongoose to the app file

const userRoutes = require('./routes/user')
const saucesRoutes = require('/routes/sauces')

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

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;