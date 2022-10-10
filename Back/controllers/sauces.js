const Sauces = require('../models/Sauces');

//POST - creates new sauces
exports.createSauces = (req, res, next) => { //ESSE DJANHO QUE EU TENHO Q MODIFICAR PRA ACEITAR MULTER, MAS ACHO Q NAO EH AQUI, EH SO NAS ROTAS
    delete req.body._id;
    const sauces = new Sauces({
        ...req.body
    });
    sauces.save()
    .then(() => res.status(201).json({ message: 'objet enregistré'}))
    .catch(error => res.status(400).json({ error }))
};
//PUT
 exports.****** = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // esse params aqui ta errado mas lembro qual eh argumento certo
      .then(() => res.status(200).json({ message: 'Sauce ajouté !'}))
      .catch(error => res.status(400).json({ error }));
  };

//DELETE
exports.***** = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};
