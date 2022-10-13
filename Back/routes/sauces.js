const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('./controllers/sauces');


router.get('/', auth, saucesCrtl.getAllSouces);

router.get('/:id', auth, saucesCtrl.getOneSauces);

router.post('/', auth, multer, saucesCrtl.createSauces); //AQUI TENHO Q MODIFICAR PRA ACEITAR O MULTER

// Allows the user to add the sauce to the API // ROUTE SAUCE
router.put('/:id', auth, multer, saucesCrtl.modifySouces.createSauces);

// Allows the user to delete sauces // ROUTE SAUCE
router.delete('/:id', auth, saucesCrtl.deleteSauces);

// Allows the user to LIKE-DISLIKE the sauces
router.post('/:id/like', auth, saucesCrtl);


module.exports = router;