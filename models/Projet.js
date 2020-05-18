var mongoose = require('mongoose');

var decomposition = new mongoose.Schema({
    nom : String,
    surnom : String,
    code : Number,
    element_parent : String,
    indice : Number,
    mode_saisie : String, //pas de saisie, hebdo, global
    nombre_heure_CM : [Number],
    nombre_heure_TD : [Number],
    nombre_heure_TP : [Number],
    nombre_heure_Partiel : [Number],
});

var projetSchema = new mongoose.Schema({
    nom : String,
    date_debut : Date,
    date_fin : Date,
    formations :
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Formation'
        }],
    intervenants:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Intervenant'
        }],
    decomposition : [decomposition]
});

var Projet = mongoose.model('Projet',projetSchema);

module.exports = Projet;