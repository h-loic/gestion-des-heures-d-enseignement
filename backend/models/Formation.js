var mongoose = require('mongoose');

var periode = new mongoose.Schema({
    nom_periode : String,
    surnom_periode : String,
    duree : Number,
    nombre_groupe_CM : Number,
    nombre_groupe_TD : Number,
    nombre_groupe_TP : Number,
    nombre_groupe_Partiel : Number,
})
var formationSchema = new mongoose.Schema({
    nom : String,
    surnom : String,
    periode : [periode]
});

var Formation = mongoose.model('Formation',formationSchema);

module.exports = Formation;
