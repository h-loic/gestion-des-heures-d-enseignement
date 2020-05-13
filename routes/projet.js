var router = require('express').Router();
var Projet = require('./../models/Projet');
var Formation = require('./../models/Formation');
var Enseignant = require('./../models/Enseignant');
var Statut = require('./../models/Statut');

router.get('/projet/intervenant/new/:idProjet/:idEnseignant', (req,res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        Enseignant.findById(req.params.idEnseignant).populate('statut').then(enseignant => {
            let nombre_heure_max = enseignant.statut.heure_normal_max + enseignant.statut.heure_supp_max ;
            projet.intervenants.push({
                nombre_heure_minimal : enseignant.statut.heure_normal_min,
                nombre_heure_maximal : nombre_heure_max,
                nombre_heure_CM : 0,
                nombre_heure_TD : 0,
                nombre_heure_TP : 0,
                nombre_heure_Partiel : 0,
                enseignant : enseignant._id
            });
            return projet.save();
        });
    }).then(() => {
        res.redirect('/projet/intervenant/' + req.params.idProjet);
    }, err => console.log(err));
});

router.get('/projet/intervenant/:idProjet', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants.enseignant').then(projet =>{
        projet.populate('intervenants.enseignant.statut').execPopulate().then((projet) => {
            Enseignant.find({}).then(enseignants =>{
                res.render('projets/intervenants/index.html', { projet : projet, enseignants : enseignants});
            });
        });
    });
});

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
