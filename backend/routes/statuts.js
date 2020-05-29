var router = require('express').Router();
const { check, validationResult } = require('express-validator');

var Statut = require('./../models/Statut');

router.get('/enseignant/statut/new', (req,res) => {
    var statut = new Statut();
    res.render('statuts/edit.html', { statut : statut, endpoint: '/enseignant/statut'});
});

router.get('/enseignant/getStatut/:id', (req,res) => {
    Statut.findById(req.params.id).then(statut => {
        res.send(statut);
    });
});

router.get('/enseignant/statut/delete/:id', (req, res) => {
    Statut.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.status(201).send();
    });
});

router.get('/enseignant/statut', (req, res) => {
    Statut.find({}).then(statuts => {
        res.send(statuts);
    });
});

router.post('/enseignant/statut/:id?',(req, res) => {
    let ans = { err : 0, data : ""};
    if (req.body.nom === ""
    || req.body.surnom === ""
    || isNaN(req.body.heure_normal_min)
    || isNaN(req.body.heure_normal_max)
    || isNaN(req.body.heure_supp_min)
    || isNaN(req.body.heure_supp_max)){
        ans.err = 1;
        ans.data = "champs vide ou ne respectant pas son type"
    }else{
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
            }
        })
    }
    res.send(ans);
});

module.exports = router;