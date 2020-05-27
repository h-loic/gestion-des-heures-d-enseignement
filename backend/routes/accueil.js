var router = require('express').Router();
var Projet = require('./../models/Projet');

router.get('/accueil-nom', (req, res) => {
    Projet.find({}).populate('formation').then(projets => {
        res.render('accueil/index.html', { projets : projets});
    });
});

router.get('/accueil-date', (req, res) => {
    Projet.find({}).populate('formation').then(projets => {
        res.send({projets : projets});
    });
});

router.get('/accueil', (req, res) => {
    Projet.find({}).populate('formation').then(projets => {
        res.send(projets);
    });
});

router.get('/', (req, res) => {
    res.redirect('/accueil');
});

module.exports = router;