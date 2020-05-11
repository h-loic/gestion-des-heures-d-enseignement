var mongoose = require('mongoose');

var projetSchema = new mongoose.Schema({
    nom : String,
    date_debut : Date,
    date_fin : Date,
    formations :
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Formation'
        }]
});

var Projet = mongoose.model('Projet',projetSchema);

module.exports = Projet;