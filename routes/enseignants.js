var router = require('express').Router();
var Enseignant = require('./../models/Enseignant');
var Statut = require('./../models/Statut');

router.get('/enseignant/new', (req,res) => {
    Statut.find({}).then(statuts =>{
        var enseignant = new Enseignant();
        res.render('enseignants/edit.html', { enseignant : enseignant, statuts : statuts, endpoint: '/enseignant'});
    });
});

router.get('/enseignant/edit/:id', (req,res) => {
    Statut.find({}).then(statuts =>{
        Enseignant.findById(req.params.id).then(enseignant => {
            res.render('enseignants/edit.html', { enseignant : enseignant, statuts : statuts, endpoint: '/enseignant/' + enseignant._id.toString()});
        });
    });
});

router.post('/enseignant/:id?', (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Enseignant.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Enseignant());
        }
    }).then(enseignant => {
        enseignant.nom = req.body.nom;
        enseignant.prenom = req.body.prenom;
        enseignant.surnom = req.body.surnom;
        enseignant.email = req.body.email;
        enseignant.statuts = req.body.statuts;

        return enseignant.save();
    }).then(() => {
        res.redirect('/enseignant');
    }, err => console.log(err));
});

router.get('/enseignant', (req, res) => {
    Enseignant.find({}).populate('statut').then(enseignants => {
        res.render('enseignants/index.html', { enseignants : enseignants});
    });
});


module.exports = router;
