var router = require('express').Router();
var Projet = require('./../models/Projet');
var Formation = require('./../models/Formation');
var Enseignant = require('./../models/Enseignant');
var Statut = require('./../models/Statut');
var Intervenant = require('./../models/Intervenant');

router.post('/projet/clone', (req, res) => {
    Projet.findById(req.body.projet._id).then(projet => {
        /*
        console.log("1");
        let projet_clone = new Projet(projet);
        console.log("2");
        projet_clone.isNew = true;
        console.log("3");
        objectIdDel(projet_clone);
        console.log("4");
        projet_clone.nom = req.body.nom;
        console.log("5");
        projet_clone.save();
        console.log("6");*/
    }).then(() => {
        res.redirect('/accueil');
    }, err => console.log(err));
});

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

router.get('/projet/getFormations', (req,res) => {
    Formation.find({}).then(formations =>{
        res.send(formations);
    });
});

router.get('/projet/clone', (req,res) => {
    Projet.find({}).then(projets =>{
        var projet = new Projet();
        res.render('projets/clone.html', { projet : projet, projets : projets, endpoint: '/projet/clone'});
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
        res.status(201).send();
    });
});

router.post('/projet/:id?', (req, res) => {
    let ans = { err : 0, data : ""};
    if (req.body.nom === ""
        || req.body.date_debut === ""
        || req.body.date_fin === ""
        || req.body.formations.length === 0){
        ans.err = 1;
        ans.data = "champs vide ou ne respectant pas son type"
    }else{
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
            projet.date_debut = req.body.date_debut;
            projet.date_fin = req.body.date_fin;
            return projet.save();
        })
    }
    res.send(ans);
});

router.get('/projet/getProjet/:id', (req, res) => {
    Projet.findById(req.params.id).populate('formations').then(projet => {
        res.send(projet);
    });
});

var objectIdDel = function(copiedObjectWithId) {
    if (copiedObjectWithId != null && typeof(copiedObjectWithId) != 'string' &&
        typeof(copiedObjectWithId) != 'number' && typeof(copiedObjectWithId) != 'boolean' ) {
        //for array length is defined however for objects length is undefined
        if (typeof(copiedObjectWithId.length) == 'undefined') {
            delete copiedObjectWithId._id;
            for (var key in copiedObjectWithId) {
                objectIdDel(copiedObjectWithId[key]); //recursive del calls on object elements
            }
        }
        else {
            for (var i = 0; i < copiedObjectWithId.length; i++) {
                objectIdDel(copiedObjectWithId[i]);  //recursive del calls on array elements
            }
        }
    }
    return "ok";
}

module.exports = router;

