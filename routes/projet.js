var router = require('express').Router();
var Projet = require('./../models/Projet');
var Formation = require('./../models/Formation');
var Enseignant = require('./../models/Enseignant');
var Statut = require('./../models/Statut');
var Intervenant = require('./../models/Intervenant');

router.get('/projet/bilan/:idProjet/', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet =>{
        projet.populate('intervenants.enseignant').execPopulate().then(projet => {
            let intervenants = projet.intervenants;
            res.render('projets/bilan/index.html', { projet : projet, intervenants : intervenants });
        });
    });
});

router.get('/projet/intervenant/new/:idProjet/:idEnseignant', (req,res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        Enseignant.findById(req.params.idEnseignant).populate('statut').then(enseignant => {
            let intervenant = new Intervenant();
            let nombre_heure_max = enseignant.statut.heure_normal_max + enseignant.statut.heure_supp_max ;
            intervenant.nombre_heure_minimal = enseignant.statut.heure_normal_min;
            intervenant.nombre_heure_maximal = nombre_heure_max;
            intervenant.nombre_heure_CM = 0;
            intervenant.nombre_heure_TD = 0;
            intervenant.nombre_heure_TP = 0;
            intervenant.nombre_heure_Partiel = 0;
            intervenant.nombre_heure_HeTD = 0;
            intervenant.nombre_heure_HeSup = 0;
            intervenant.nombre_heure_total = 0;
            intervenant.enseignant = enseignant._id;
            intervenant.save();
            projet.intervenants.push(intervenant._id);
            return projet.save();
        });
    }).then(() => {
        res.redirect('/projet/intervenant/' + req.params.idProjet);
    }, err => console.log(err));
});

router.get('/projet/intervenant/edit/:idProjet/:idIntervenant', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet =>{
        res.render('projets/intervenants/edit.html', { projet : projet,
            endpoint : '/projet/intervenant/' + req.params.idProjet + '/' + req.params.idIntervenant});
    });
});

router.get('/projet/intervenant/delete/:idProjet/:idIntervenant', (req, res) => {
    Projet.findById(req.params.idProjet).then(projet =>{
        // TODO : supprimer le document dans la collection intervenant
        projet.intervenants.pull({_id : req.params.idIntervenant});
        projet.save();
        res.redirect('/projet/intervenant/' + req.params.idProjet);
    });
});

router.post('/projet/intervenant/:idProjet/:idIntervenant', (req, res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
        Intervenant.findById(req.params.idIntervenant).then(intervenant => {
            intervenant.nombre_heure_minimal = req.body.nombre_heure_minimal;
            intervenant.nombre_heure_maximal = req.body.nombre_heure_maximal;
            intervenant.save();
        });
    }).then(() => {
        res.redirect('/projet/intervenant/'+ req.params.idProjet);
    }, err => console.log(err));
});


router.get('/projet/intervenant/:idProjet', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet =>{
        projet.populate('intervenants.enseignant').execPopulate().then((projet) => {
            projet.populate('intervenants.enseignant.statut').execPopulate().then((projet) => {
                Enseignant.find({}).then(enseignants =>{
                    res.render('projets/intervenants/index.html', { projet : projet, enseignants : enseignants});
                });
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
        Projet.findById(req.params.id).populate('formations').then(projet => {
            res.render('projets/index.html', { projet : projet, formations : formations});
        });
    });
});

module.exports = router;
