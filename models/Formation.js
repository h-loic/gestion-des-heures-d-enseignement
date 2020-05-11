var mongoose = require('mongoose');

var formationSchema = new mongoose.Schema({
    nom : String,
    surnom : String,
    periode : [{
        nom_periode : String,
        duree : Number,
        nombre_groupe_CM : Number,
        nombre_groupe_TD : Number,
        nombre_groupe_TP : Number,
        nombre_groupe_Partiel : Number,
        decomposition : [{
            nom_decomposition : String,
            niveau : Number
        }]
    }]
});

var Formation = mongoose.model('Formation',formationSchema);

module.exports = Formation;
