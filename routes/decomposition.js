var router = require('express').Router();
var Formation = require('./../models/Formation');
var Projet = require('./../models/Projet');

router.get('/projet/decomposition/:idProjet/:idFormation', (req,res) => {
    Formation.findById(req.params.idFormation).then(formation =>{
        Projet.findById(req.params.idProjet).then(projet => {
            res.render('decomposition/index.html', {formation: formation, projet : projet});
        });
    });
});

module.exports = router;
