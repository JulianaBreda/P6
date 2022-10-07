const express = require('express');
const auth = require('auth');
const router = express.Router();

const userCtrl = require('../controllers/user') //AQUI NAO TENHO CERTEZA SE EH USER OU AUTH

router.post('/signup', auth, userCtrl.signup);

router.post('/login', auth, userCtrl.login);


/*// Allows the user to add the sauce to the API // ROUTE SAUCE
  router.put('/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // esse params aqui ta errado mas lembro qual eh argumento certo
      .then(() => res.status(200).json({ message: 'Sauce ajouté !'}))
      .catch(error => res.status(400).json({ error }));
  });


// Allows the user to delete sauces // ROUTE SAUCE
router.delete('/:id', (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

// exemplos
router.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  router.use((req, res, next) => {
    res.status(201);
    next();
  });
  
  router.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  router.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });  */


module.exports = router;