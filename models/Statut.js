var mongoose = require('mongoose');

var statutSchema = new mongoose.Schema({
    nom : String,
    surnom: String,
    heure_normal_min : Number,
    heure_normal_max : Number,
    heure_supp_min : Number,
    heure_supp_max : Number,
})

statutSchema.virtual('enseignants',{
    ref: 'Enseignant',
    localField: '_id',
    foreignField: 'statut'
});

var Statut = mongoose.model('Statut',statutSchema);

module.exports = Statut;