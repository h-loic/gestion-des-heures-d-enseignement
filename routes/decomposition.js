var router = require('express').Router();
var Formation = require('./../models/Formation');
var Projet = require('./../models/Projet');

router.get('/projet/decomposition/:idProjet/:idFormation', (req,res) => {
    Formation.findById(req.params.idFormation).then(formation =>{
        Projet.findById(req.params.idProjet).then(projet => {
            let decompositions = projet.decomposition;
            let tableau_decomposition = [];
            let compteur = 1;
            let en_cours = true;
            while (en_cours){
                let tab = [];
                for (let i = 0; i < decompositions.length; i++){
                    if (decompositions[i].indice === compteur){
                        tab.push(decompositions[i]);
                    }
                }
                if (tab.length === 0){
                    en_cours = false;
                }else{
                    tableau_decomposition.push(tab);
                    compteur+=1;
                }
            }
            res.render('decomposition/index.html', {formation: formation, projet : projet, tableau_decomposition : tableau_decomposition});
        });
    });
});

router.get('/projet/decomposition/new/:idProjet/:idFormation/:idParent/:indice', (req,res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        res.render('decomposition/add.html', { projet : projet,idFormation : req.params.idFormation,
            idParent : req.params.idParent, indice : req.params.indice,
            endpoint: '/projet/decomposition/' + projet._id.toString() + '/' + req.params.idFormation});
    });
});

router.get('/projet/decomposition/edit/:idProjet/:idFormation/:idDecomposition', (req,res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        let decomposition = projet.decomposition.id(req.params.idDecomposition);
        res.render('decomposition/edit.html', {projet : projet, decomposition : decomposition, idFormation : req.params.idFormation,
            endpoint : '/projet/decomposition/edit/' + projet._id.toString() + '/' + req.params.idFormation + '/' + req.params.idDecomposition});
    });
});

router.get('/projet/decomposition/delete/:idProjet/:idFormation/:idDecomposition', (req,res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        projet.decomposition.id(req.params.idDecomposition).remove();
        projet.save();
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    });
});

router.post('/projet/decomposition/edit/:idProjet/:idFormation/:idDecomposition', (req, res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        let decomposition = projet.decomposition.id(req.params.idDecomposition);
        decomposition.nom = req.body.nom;
        decomposition.surnom = req.body.surnom;
        decomposition.mode_saisie = req.body.mode_saisie
        return projet.save();
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.post('/projet/decomposition/:idProjet/:idFormation', (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.idDecomposition){
            res.redirect('/accueil');
        }
        else{
            Projet.findById(req.params.idProjet).then(projet => {
                projet.decomposition.push({
                    nom : req.body.nom,
                    surnom : req.body.surnom,
                    element_parent : req.body.element_parent,
                    indice : req.body.indice,
                    mode_saisie : req.body.mode_saisie,
                    //nombre_heure_CM : req.body.nombre_heure_CM,
                    //nombre_heure_TD : req.body.nombre_heure_TD,
                    //nombre_heure_TP : req.body.nombre_heure_TP,
                    //nombre_heure_Partiel : req.body.nombre_heure_Partiel
                });
                return projet.save();
            }).then(() => {
                res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
            }, err => console.log(err));
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
