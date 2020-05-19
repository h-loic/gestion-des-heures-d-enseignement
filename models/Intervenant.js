var mongoose = require('mongoose');


var intervenantSchema = new mongoose.Schema({
    nombre_heure_minimal : Number,
    nombre_heure_maximal : Number,
    nombre_heure_CM : [Number],
    nombre_heure_TD : [Number],
    nombre_heure_TP : [Number],
    nombre_heure_Partiel : [Number],
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant'
    }
});

var Intervenant = mongoose.model('Intervenant',intervenantSchema);

module.exports = Intervenant;