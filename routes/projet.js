var router = require('express').Router();
var Projet = require('./../models/Projet');
var Formation = require('./../models/Formation');

router.get('/projet/new', (req,res) => {
    Formation.find({}).then(formations =>{
        var projet = new Projet();
        res.render('projets/edit.html', { projet : projet, formations : formations, endpoint: '/projet'});
    });
});

router.get('/projet/edit/:id', (req,res) => {
    Formation.find({}).then(formations =>{
        Projet.findById(req.params.id).then(projet => {
            res.render('projets/edit.html', { projet : projet, formations : formations, endpoint: '/projet/' + projet._id.toString()});
        });
    });
});

router.get('/projet/delete/:id', (req, res) => {
    Projet.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.redirect('/accueil');
    });
});

router.post('/projet/:id?', (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Projet.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Projet());
        }
    }).then(projet => {
        projet.nom = req.body.nom;
        projet.formations = req.body.formations;
        return projet.save();
    }).then(() => {
        res.redirect('/accueil');
    }, err => console.log(err));
});

router.get('/projet/:id', (req, res) => {
    Formation.find({}).then(formations =>{
        Projet.findById(req.params.id).then(projet => {
            res.render('projets/index.html', { projet : projet, formations : formations});
        });
    });
});

module.exports = router;
