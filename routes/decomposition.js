var router = require('express').Router();
var Formation = require('./../models/Formation');
var Projet = require('./../models/Projet');

router.get('/projet/decomposition/:idProjet/:idFormation', (req,res) => {
    Formation.findById(req.params.idFormation).then(formation =>{
        Projet.findById(req.params.idProjet).populate('intervenants.enseignant').then(projet => {
            let intervenants = projet.intervenants;
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
            res.render('decomposition/index.html', {formation: formation, projet : projet, tableau_decomposition : tableau_decomposition, intervenants : intervenants});
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

router.post('/projet/decomposition/record/:idProjet/:idFormation/:duree/:idDecomposition', (req, res) => {
    Formation.findById(req.params.idFormation).then( formation => {
        Projet.findById(req.params.idProjet).then(projet => {
            let duree = req.params.duree;
            let decomposition = projet.decomposition.id(req.params.idDecomposition);
            let heure_CM = [];
            let heure_TD = [];
            let heure_TP = [];
            let heure_Partiel = [];
            let somme_heure_CM = 0;
            let somme_heure_TD = 0;
            let somme_heure_TP = 0;
            let somme_heure_Partiel = 0;

            for (let i = 0 ; i < duree; i++){
                if (isNaN(req.body.nombre_heure_CM[i]) || req.body.nombre_heure_CM[i] === '0' || req.body.nombre_heure_CM[i] === ''){
                    heure_CM.push(0);
                }else{
                    heure_CM.push(req.body.nombre_heure_CM[i]);
                    somme_heure_CM += parseInt(req.body.nombre_heure_CM[i]);
                }
                if (isNaN(req.body.nombre_heure_TD[i]) || req.body.nombre_heure_TD[i] === '0' || req.body.nombre_heure_TD[i] === ''){
                    heure_TD.push(0);
                }else{
                    heure_TD.push(req.body.nombre_heure_TD[i]);
                    somme_heure_TD += parseInt(req.body.nombre_heure_TD[i]);
                }
                if (isNaN(req.body.nombre_heure_TP[i]) || req.body.nombre_heure_TP[i] === '0' || req.body.nombre_heure_TP[i] === ''){
                    heure_TP.push(0);
                }else{
                    heure_TP.push(req.body.nombre_heure_TP[i]);
                    somme_heure_TP += parseInt(req.body.nombre_heure_TP[i]);
                }
                if (isNaN(req.body.nombre_heure_Partiel[i]) || req.body.nombre_heure_Partiel[i] === '0' || req.body.nombre_heure_Partiel[i] === ''){
                    heure_Partiel.push(0);
                }else{
                    heure_Partiel.push(req.body.nombre_heure_Partiel[i]);
                    somme_heure_Partiel += parseInt(req.body.nombre_heure_Partiel[i]);
                }
            }
            heure_CM.push(somme_heure_CM);
            heure_TD.push(somme_heure_TD);
            heure_TP.push(somme_heure_TP);
            heure_Partiel.push(somme_heure_Partiel);
            decomposition.nombre_heure_CM = heure_CM;
            decomposition.nombre_heure_TD = heure_TD;
            decomposition.nombre_heure_TP = heure_TP;
            decomposition.nombre_heure_Partiel = heure_Partiel;
            return projet.save();
        }).then(() => {
            res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
        }, err => console.log(err));
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
