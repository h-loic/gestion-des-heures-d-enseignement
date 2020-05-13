var router = require('express').Router();
const { check, validationResult } = require('express-validator');

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

router.post('/enseignant/statut/:id?', [
    check('nom').isLength({ min: 1 }).withMessage('le nom est obligatoire'),
    check('surnom').isLength({ min: 1 }).withMessage('le surnom est obligatoire'),
    check('heure_normal_min').isNumeric().withMessage('le nombre d heure normal minimal doit etre un nombre'),
    check('heure_normal_max').isNumeric().withMessage('le nombre d heure normal maximal doit etre un nombre'),
    check('heure_supp_min').isNumeric().withMessage('le nombre d heure supplémentaire minimal doit etre un nombre'),
    check('heure_supp_max').isNumeric().withMessage('le nombre d heure supplémentaire maximal doit etre un nombre'),
], (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Statut.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Statut());
        }
    }).then(statut => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('statuts/edit.html', { statut : statut, errors : errors.array() ,endpoint: '/enseignant/statut/' + statut._id.toString()});
        }else {
            statut.nom = req.body.nom;
            statut.surnom = req.body.surnom;
            statut.heure_normal_min = req.body.heure_normal_min;
            statut.heure_normal_max = req.body.heure_normal_max;
            statut.heure_supp_min = req.body.heure_supp_min;
            statut.heure_supp_max = req.body.heure_supp_max;

            statut.save();

            return res.redirect('/enseignant/statut');
        }
    })
});

module.exports = router;