var router = require('express').Router();

router.use('/', (req, res) => {
    res.render('accueil/index.html');
});

module.exports = router;