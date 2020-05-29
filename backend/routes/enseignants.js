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

router.get('/enseignant/delete/:id', (req, res) => {
    Enseignant.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.redirect('/enseignant');
    });
});

router.get('/enseignant-statut', (req, res) => {
    Enseignant.find({}).populate('statut').sort({statut : 1}).then(enseignants => {
        res.render('enseignants/index.html', { enseignants : enseignants});
    });
});

router.get('/enseignant', (req, res) => {
    Enseignant.find({}).populate('statut').then(enseignants => {
        res.send(enseignants);
    });
});

router.post('/enseignant/:id?', (req, res) => {
    let ans = { err : 0, data : ""};
    if (req.body.nom === ""
        || req.body.surnom === ""
        || req.body.prenom === ""
        || req.body.email === ""
        || req.body.statut === ""){
        ans.err = 1;
        ans.data = "champs vide ou ne respectant pas son type"
    }else{
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
            enseignant.statut = req.body.statut;
            return enseignant.save();
        })
    }
    res.send(ans);
});

module.exports = router;
