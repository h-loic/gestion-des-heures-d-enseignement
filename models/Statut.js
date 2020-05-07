var mongoose = require('mongoose');

var statutSchema = new mongoose.Schema({
    nom : String,
    surnom: String,
    heure_a_faire : [],
    heure_supp : []
})

statutSchema.virtual('enseignants',{
    ref: 'Enseignant',
    localField: '_id',
    foreignField: 'statuts'
});

var Statut = mongoose.model('Statut',statutSchema);

module.exports = Statut;