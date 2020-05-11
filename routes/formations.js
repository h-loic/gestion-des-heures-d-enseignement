var router = require('express').Router();
var Formation = require('./../models/Formation');

router.get('/formation/delete-periode/:id/:idPeriode', (req, res) => {
    Formation.findById(req.params.id).then(formation => {
        formation.periode.id(req.params.idPeriode).remove();
        formation.save();
        res.redirect('/formation');
    });
});

router.get('/formation/add-periode/:id', (req,res) => {
    Formation.findById(req.params.id).then(formation => {
        res.render('formations/edit-periode.html', { formation : formation, endpoint: '/formation/add-periode/' + formation._id.toString()});
    });
});

router.get('/formation/edit-periode/:id/:idPeriode', (req,res) => {
    Formation.findById(req.params.id).then(formation => {
        let periode = formation.periode.id(req.params.idPeriode);
        res.render('formations/edit-periode.html', { periode :periode , endpoint: '/formation/edit-periode/' + formation._id.toString() + '/' + periode._id.toString()});
    });
});

router.post('/formation/edit-periode/:id/:idPeriode', (req, res) => {
    Formation.findById(req.params.id).then(formation => {
        let periode = formation.periode.id(req.params.idPeriode);
        periode.nom_periode = req.body.nom ;
        return formation.save();
    }).then(() => {
        res.redirect('/formation');
    }, err => console.log(err));
});

router.post('/formation/add-periode/:id?', (req, res) => {
    Formation.findById(req.params.id).then(formation => {
        formation.periode.push({
            nom_periode : req.body.nom
        });
        return formation.save();
    }).then(() => {
        res.redirect('/formation');
    }, err => console.log(err));
});


router.get('/formation/new', (req,res) => {
    var formation = new Formation();
    res.render('formations/edit.html', { formation : formation, endpoint: '/formation'});
});

router.get('/formation/edit/:id', (req,res) => {
    Formation.findById(req.params.id).then(formation => {
        res.render('formations/edit.html', { formation : formation, endpoint: '/formation/' + formation._id.toString()});
    });
});

router.get('/formation/delete/:id', (req, res) => {
    Formation.findOneAndRemove({ _id : req.params.id}).then(() => {
        res.redirect('/formation');
    });
});

router.get('/formation', (req, res) => {
    Formation.find({}).then(formations => {
        res.render('formations/index.html', { formations : formations});
    });
});

router.post('/formation/:id?', (req, res) => {
    new Promise((resolve, reject) =>{
        if (req.params.id){
            Formation.findById(req.params.id).then(resolve,reject);
        }
        else{
            resolve(new Formation());
        }
    }).then(formation => {
        formation.nom = req.body.nom;
        formation.surnom = req.body.surnom;

        return formation.save();
    }).then(() => {
        res.redirect('/formation');
    }, err => console.log(err));
});

module.exports = router;