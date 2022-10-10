const express = require('express');

const router = express.Router();

router.get('/api/sauces', saucesCrtl);

router.get('/api/sauces/:id', saucesCtrl);

router.post('/api/sauces', saucesCrtl.createSauces); //AQUI TENHO Q MODIFICAR PRA ACEITAR O MULTER

// Allows the user to add the sauce to the API // ROUTE SAUCE
router.put('/:id', saucesCrtl);

// Allows the user to delete sauces // ROUTE SAUCE
router.delete('/:id', saucesCrtl);

// Allows the user to LIKE-DISLIKE the sauces
router.post('/api/sauces/:id/like', saucesCrtl);


module.exports = router;