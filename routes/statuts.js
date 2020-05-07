var router = require('express').Router();

var Statut = require('./../models/Statut');

router.get('/enseignant/statut/new', (req,res) => {
    var statut = new Statut();
    res.render('statuts/edit.html', { statut : statut, endpoint: '/enseignant/statut'});
});

router.get('/enseignant/statut/edit/:id', (req,res) => {
    Statut.findById(req.params.id).then(statut => {
        res.render('statuts/edit.html', { statut : statut, endpoint: '/enseignant/statut/' + statut._id.toString()});
    });
});

router.get('/enseignant/statut/delete/:id', (req, res) => {
    Statut.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.redirect('/enseignant/statut');
    });
});

router.get('/enseignant/statut', (req, res) => {
    Statut.find({}).then(statuts => {
        res.render('statuts/index.html', { statuts : statuts});
    });
});

router.post('/enseignant/statut/:id?', (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Statut.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Statut());
        }
    }).then(statut => {
        statut.nom = req.body.nom;
        statut.surnom = req.body.surnom;
        statut.heure_normal_min = req.body.heure_normal_min;
        statut.heure_normal_max = req.body.heure_normal_max;
        statut.heure_supp_min = req.body.heure_supp_min;
        statut.heure_supp_max = req.body.heure_supp_max;

        return statut.save();
    }).then(() => {
        res.redirect('/enseignant/statut');
    }, err => console.log(err));
});

module.exports = router;