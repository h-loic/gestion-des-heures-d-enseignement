var router = require('express').Router();
var Formation = require('./../models/Formation');

router.get('/formation/getPeriode/:id/:idPeriode', (req,res) => {
    Formation.findById(req.params.id).then(formation => {
        let periode = formation.periode.id(req.params.idPeriode);
        res.send(periode);
    });
});

router.post('/formation/edit-periode/:id/:idPeriode', (req, res) => {
    let ans = { err : 0, data : ""};
    Formation.findById(req.params.id).then(formation => {
        if (req.body.nom === "" || req.body.surnom === "" || req.body.duree === "" || isNaN(req.body.duree) || req.body.nombre_groupe_CM === "" || isNaN(req.body.nombre_groupe_CM)
            || req.body.nombre_groupe_TD === "" || isNaN(req.body.nombre_groupe_TD) || req.body.nombre_groupe_TP === "" || isNaN(req.body.nombre_groupe_TP)
            || req.body.nombre_groupe_Partiel === "" || isNaN(req.body.nombre_groupe_Partiel)){
            ans.err = 1;
            ans.data = "string vide ou non string ou non nombre";
        }else {
            let periode = formation.periode.id(req.params.idPeriode);
            periode.nom_periode = req.body.nom;
            periode.surnom_periode = req.body.surnom;
            periode.duree = req.body.duree;
            periode.nombre_groupe_CM = req.body.nombre_groupe_CM;
            periode.nombre_groupe_TD = req.body.nombre_groupe_TD;
            periode.nombre_groupe_TP = req.body.nombre_groupe_TP;
            periode.nombre_groupe_Partiel = req.body.nombre_groupe_Partiel;
            return formation.save();
        }
    }).then(() => {
        res.send(ans);
    }, err => console.log(err));
});

router.post('/formation/add-periode/:id?', (req, res) => {
    let ans = { err : 0, data : ""};
    Formation.findById(req.params.id).then(formation => {
        if (req.body.nom === "" || req.body.surnom === "" || req.body.duree === "" || isNaN(req.body.duree) || req.body.nombre_groupe_CM === "" || isNaN(req.body.nombre_groupe_CM)
            || req.body.nombre_groupe_TD === "" || isNaN(req.body.nombre_groupe_TD) || req.body.nombre_groupe_TP === "" || isNaN(req.body.nombre_groupe_TP)
            || req.body.nombre_groupe_Partiel === "" || isNaN(req.body.nombre_groupe_Partiel)){
            ans.err = 1;
            ans.data = "string vide ou non string ou non nombre";
        }else{
            formation.periode.push({
                nom_periode : req.body.nom,
                surnom_periode : req.body.surnom,
                duree : req.body.duree,
                nombre_groupe_CM : req.body.nombre_groupe_CM,
                nombre_groupe_TD : req.body.nombre_groupe_TD,
                nombre_groupe_TP : req.body.nombre_groupe_TP,
                nombre_groupe_Partiel : req.body.nombre_groupe_Partiel
            });
            return formation.save();
        }
    }).then(() => {
        res.send(ans);
    }, err => console.log(err));
});


router.get('/formation/new', (req,res) => {
    var formation = new Formation();
    res.render('formations/edit.html', { formation : formation, endpoint: '/formation'});
});

router.get('/formation/getFormation/:id', (req,res) => {
    Formation.findById(req.params.id).then(formation => {
        res.send( formation);
    });
});

router.get('/formation/delete-periode/:id/:idPeriode', (req, res) => {
    Formation.findById(req.params.id).then(formation => {
        formation.periode.id(req.params.idPeriode).remove();
        formation.save();
        res.status(201).send();
    });
});

router.get('/formation/delete/:id', (req, res) => {
    Formation.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.status(201).send();
    });
});

router.get('/formation', (req, res) => {
    Formation.find({}).then(formations => {
        res.send(formations);
    });
});

router.post('/formation/:id?', (req, res) => {
    var ans = { err : 0, data : ""};
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Formation.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Formation());
        }
    }).then(formation => {
        if (req.body.nom === "" || req.body.surnom === "" ){
            ans.err = 1;
            ans.data = "string vide ou non string";
        }else{
            formation.nom = req.body.nom;
            formation.surnom = req.body.surnom;
            formation.save();
        }
    }).then(() => {
        res.send(ans);
    }, err => console.log(err));
});

module.exports = router;