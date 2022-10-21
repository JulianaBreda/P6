const sauces = require('../models/sauces');
const fs = require('fs');


//GET - get all the souces from the data base
exports.getAllSauces = (req, res, next) => {
    sauces.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch((error) => {
        res.status(400).json({ error: error });
    })
} 

// GET - get one specific sauces from the data base

exports.getOneSauces = (req, res, next) => {
    sauces.findOne({
      _id: req.params.id
    }).then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  };

//POST - creates new sauces
exports.createSauces = (req, res, next) => { //ESSE DJANHO QUE EU TENHO Q MODIFICAR PRA ACEITAR MULTER, MAS ACHO Q NAO EH AQUI, EH SO NAS ROTAS
  console.log(req.body)  
  const saucesObject = JSON.parse(req.body.sauce);
    delete saucesObject._id;
    delete saucesObject._userId;
    const Sauces = new sauces({
        ...saucesObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    Sauces.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

//PUT
exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file ? { //if it finds a file uploaded by the user
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete saucesObject._userId;
  sauces.findOne({_id: req.params.id})
      .then((saucesData) => {
          if (saucesData.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
            console.log(saucesObject);
            sauces.updateOne({ _id: req.params.id}, { ...saucesObject, _id: req.params.id}) //TEM PROBLEMA NESSA FUCKING LINHA
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

//DELETE - allows the user to delete the sauce - delete the object from data base - delete the image from the folder 'images'
exports.deleteSauces = (req, res, next) => {
  sauces.findOne({ _id: req.params.id})
      .then(sauces => {
          if (sauces.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauces.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => { //delete the pic file from database
                  sauces.deleteOne({_id: req.params.id}) //delete the record from database
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})}) //NAO SEI COMO FAZER PRA APAGAR O OBJETO DA MEU LOCAL 
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};
//POST - Allows the user to like or dislike any sauce 
exports.likesAndDislikes = (req, res, next) => { //nao tenho certeza se aqui nessa linha vai esse next ou nao
  const userIdentification = req.body.userId
  const likeStatus = req.body.like
  if (likeStatus === 1){
    sauces.updateOne({_id:req.params.id},{$inc:{likes:+1},
    $push:{usersLiked:userIdentification}})
    .then(() => res.status(201).json({message:"like registered"}))
    .catch(error => res.status(400).json(error))}
 
    if (likeStatus === 0){ //undo like - line 107
    sauces.findOne({
      _id: req.params.id
    })
    .then((sauce) => {
      const usersLikedArray  = sauce.usersLiked;
      const usersDislikedArray = sauce.usersDisliked;
      if(usersLikedArray.indexOf(userIdentification)!= -1){
        sauces.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userIdentification } })
        .then(() => {
            res.status(201).json({ message: ['Like canceled', 'Dislike canceled']});
        })
        .catch((error) => res.status(400).json(error));
      }
      if(usersDislikedArray.indexOf(userIdentification)!= -1){
        sauces.updateOne(    //undo dislike 
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: userIdentification } }
        )
        .then(() => {
          res.status(201).json({ message: ['Like canceled', 'Dislike canceled']});
        })
        .catch((error) => res.status(400).json(error));
      }
   })
  .catch((error) => res.status(400).json({ error }));
  }
  
  if (likeStatus === -1){ //esse bloco nao sei se se aplica nao, pq segundo a correcao que eu achei no stakoverflow me parece q o cancelamento do dislike ta no bloco de cima
    sauces.updateOne({_id:req.params.id},{$inc:{dislikes:+1},
    $push:{usersDisliked:userIdentification}})
    .then(() => res.status(201).json({message: "dislike canceled"}))
    .catch(error => res.status(400).json(error))
  }
}