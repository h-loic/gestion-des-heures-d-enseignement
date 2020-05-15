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
    nombre_heure_Partiel : [Number]
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
    intervenants: [{
        nombre_heure_minimal : Number,
        nombre_heure_maximal : Number,
        nombre_heure_CM : Number,
        nombre_heure_TD : Number,
        nombre_heure_TP : Number,
        nombre_heure_Partiel : Number,
        enseignant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Enseignant'
        }
    }],
    decomposition : [decomposition]
});

var Projet = mongoose.model('Projet',projetSchema);

module.exports = Projet;