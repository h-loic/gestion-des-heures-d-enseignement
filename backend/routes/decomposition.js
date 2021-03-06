var router = require('express').Router();
var Formation = require('./../models/Formation');
var Projet = require('./../models/Projet');

router.post('/projet/decomposition/intervenant/record-global/:idProjet/:idFormation/:idDecomposition/:idIntervenant', (req, res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
                projet.populate('intervenants.enseignant').execPopulate().then(projet => {
                    projet.populate('intervenants.enseignant.statut').execPopulate().then(projet => {
                let decomposition = projet.decomposition.id(req.params.idDecomposition);
                let intervenant_decomposition  = decomposition.intervenants.id(req.params.idIntervenant);
                let index_intervenant;
                for (let i = 0; i < projet.intervenants.length ; i++){
                    if (projet.intervenants[i]._id.toString() === intervenant_decomposition.intervenant.toString()){
                        index_intervenant = i;
                    }
                }
                if (isNaN(projet.intervenants[index_intervenant].nombre_heure_HeTD)){
                    projet.intervenants[index_intervenant].nombre_heure_HeTD = 0;
                }else{
                    projet.intervenants[index_intervenant].nombre_heure_total -= projet.intervenants[index_intervenant].nombre_heure_HeTD;
                }
                if (intervenant_decomposition.nombre_heure_HeTD !== 'undefined') {
                    projet.intervenants[index_intervenant].nombre_heure_HeTD -= intervenant_decomposition.nombre_heure_HeTD;
                }

                intervenant_decomposition.nombre_groupe = req.body.nombre_groupe_suivis;
                intervenant_decomposition.nombre_heure_HeTD = req.body.nombre_groupe_suivis*decomposition.forfait;
                projet.intervenants[index_intervenant].nombre_heure_HeTD += intervenant_decomposition.nombre_heure_HeTD;
                projet.intervenants[index_intervenant].nombre_heure_total += projet.intervenants[index_intervenant].nombre_heure_HeTD;
                if (projet.intervenants[index_intervenant].nombre_heure_total > projet.intervenants[index_intervenant].enseignant.statut.heure_normal_max) {
                    projet.intervenants[index_intervenant].nombre_heure_HeSup = projet.intervenants[index_intervenant].nombre_heure_total - projet.intervenants[index_intervenant].enseignant.statut.heure_normal_max;
                }
                projet.intervenants[index_intervenant].save();
                return projet.save();
            });
        });
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.post('/projet/decomposition/record-global/:idProjet/:idFormation/:idDecomposition', (req, res) => {
    Projet.findById(req.params.idProjet).then(projet => {
        let decomposition = projet.decomposition.id(req.params.idDecomposition);
        decomposition.nombre_groupe = req.body.nombre_groupe;
        decomposition.forfait = req.body.forfait;
        return projet.save();
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.post('/projet/decomposition/intervenant/record/:idProjet/:idFormation/:duree/:idDecomposition/:idIntervenant', (req, res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
        projet.populate('intervenants.enseignant').execPopulate().then(projet => {
            projet.populate('intervenants.enseignant.statut').execPopulate().then(projet => {
                let decomposition = projet.decomposition.id(req.params.idDecomposition);
                let intervenant_decomposition = decomposition.intervenants.id(req.params.idIntervenant);
                let duree = req.params.duree;
                let total = 0;
                duree -= 1;

                let index_intervenant;
                for (let i = 0; i < projet.intervenants.length; i++) {
                    if (projet.intervenants[i]._id.toString() === intervenant_decomposition.intervenant.toString()) {
                        index_intervenant = i;
                    }
                }
                if (intervenant_decomposition.nombre_heure_CM[duree] !== 'undefined') {
                    projet.intervenants[index_intervenant].nombre_heure_CM -= intervenant_decomposition.nombre_heure_CM[duree];
                    total += intervenant_decomposition.nombre_heure_CM[duree];
                }
                if (intervenant_decomposition.nombre_heure_TD[duree] !== 'undefined') {
                    projet.intervenants[index_intervenant].nombre_heure_TD -= intervenant_decomposition.nombre_heure_TD[duree];
                    total += intervenant_decomposition.nombre_heure_TD[duree];
                }
                if (intervenant_decomposition.nombre_heure_TP[duree] !== 'undefined') {
                    projet.intervenants[index_intervenant].nombre_heure_TP -= intervenant_decomposition.nombre_heure_TP[duree];
                    total += intervenant_decomposition.nombre_heure_TP[duree];
                }
                if (intervenant_decomposition.nombre_heure_Partiel[duree] !== 'undefined') {
                    projet.intervenants[index_intervenant].nombre_heure_Partiel -= intervenant_decomposition.nombre_heure_Partiel[duree];
                    total += intervenant_decomposition.nombre_heure_Partiel[duree];
                }

                projet.intervenants[index_intervenant].nombre_heure_total -= total;


                let heure_CM = [];
                let heure_TD = [];
                let heure_TP = [];
                let heure_Partiel = [];
                let somme_heure_CM = 0;
                let somme_heure_TD = 0;
                let somme_heure_TP = 0;
                let somme_heure_Partiel = 0;
                total = 0;

                for (let i = 0; i < duree; i++) {
                    if (isNaN(req.body.nombre_heure_CM[i]) || req.body.nombre_heure_CM[i] === '0' || req.body.nombre_heure_CM[i] === '') {
                        heure_CM.push(0);
                    } else {
                        heure_CM.push(req.body.nombre_heure_CM[i]);
                        somme_heure_CM += parseInt(req.body.nombre_heure_CM[i]);
                    }
                    if (isNaN(req.body.nombre_heure_TD[i]) || req.body.nombre_heure_TD[i] === '0' || req.body.nombre_heure_TD[i] === '') {
                        heure_TD.push(0);
                    } else {
                        heure_TD.push(req.body.nombre_heure_TD[i]);
                        somme_heure_TD += parseInt(req.body.nombre_heure_TD[i]);
                    }
                    if (isNaN(req.body.nombre_heure_TP[i]) || req.body.nombre_heure_TP[i] === '0' || req.body.nombre_heure_TP[i] === '') {
                        heure_TP.push(0);
                    } else {
                        heure_TP.push(req.body.nombre_heure_TP[i]);
                        somme_heure_TP += parseInt(req.body.nombre_heure_TP[i]);
                    }
                    if (isNaN(req.body.nombre_heure_Partiel[i]) || req.body.nombre_heure_Partiel[i] === '0' || req.body.nombre_heure_Partiel[i] === '') {
                        heure_Partiel.push(0);
                    } else {
                        heure_Partiel.push(req.body.nombre_heure_Partiel[i]);
                        somme_heure_Partiel += parseInt(req.body.nombre_heure_Partiel[i]);
                    }
                }
                total = somme_heure_Partiel + somme_heure_CM + somme_heure_TP + somme_heure_TD;
                projet.intervenants[index_intervenant].nombre_heure_CM += somme_heure_CM;
                projet.intervenants[index_intervenant].nombre_heure_TD += somme_heure_TD;
                projet.intervenants[index_intervenant].nombre_heure_TP += somme_heure_TP;
                projet.intervenants[index_intervenant].nombre_heure_Partiel += somme_heure_Partiel;
                projet.intervenants[index_intervenant].nombre_heure_total += total;
                if (projet.intervenants[index_intervenant].nombre_heure_total > projet.intervenants[index_intervenant].enseignant.statut.heure_normal_max) {
                    projet.intervenants[index_intervenant].nombre_heure_HeSup = projet.intervenants[index_intervenant].nombre_heure_total - projet.intervenants[index_intervenant].enseignant.statut.heure_normal_max;
                }
                projet.intervenants[index_intervenant].save();
                heure_CM.push(somme_heure_CM);
                heure_TD.push(somme_heure_TD);
                heure_TP.push(somme_heure_TP);
                heure_Partiel.push(somme_heure_Partiel);

                intervenant_decomposition.nombre_heure_CM = heure_CM;
                intervenant_decomposition.nombre_heure_TD = heure_TD;
                intervenant_decomposition.nombre_heure_TP = heure_TP;
                intervenant_decomposition.nombre_heure_Partiel = heure_Partiel;
                return projet.save();
            });
        });
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.get('/projet/decomposition/delete-intervenant/:idProjet/:idFormation/:idDecomposition/:idIntervenant', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
        let decomposition = projet.decomposition.id(req.params.idDecomposition);
        decomposition.intervenants.pull({_id :req.params.idIntervenant});
        projet.save();
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.get('/projet/decomposition/new-intervenant/:idProjet/:idFormation/:idDecomposition/:idIntervenant', (req,res) => {
    Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
        let decomposition = projet.decomposition.id(req.params.idDecomposition);
        decomposition.intervenants.push({
            intervenant : req.params.idIntervenant
        });
        projet.save();
    }).then(() => {
        res.redirect('/projet/decomposition/'+ req.params.idProjet +'/'+ req.params.idFormation);
    }, err => console.log(err));
});

router.get('/projet/decomposition/:idProjet/:idFormation', (req,res) => {
    Formation.findById(req.params.idFormation).then(formation =>{
        Projet.findById(req.params.idProjet).populate('intervenants').then(projet => {
            projet.populate('intervenants.enseignant').execPopulate().then(projet => {
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
                res.send( {formation: formation, projet : projet, tableau_decomposition : tableau_decomposition, intervenants : intervenants});
            });
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
