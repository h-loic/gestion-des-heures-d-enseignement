var mongoose = require('mongoose');

var enseignantSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    surnom : String,
    email : String,
    statuts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Statut'
        }
    ]
});

var Enseignant = mongoose.model('Enseignant',enseignantSchema);

module.exports = Enseignant;
