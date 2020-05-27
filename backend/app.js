var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
    dest : __dirname + '/images'
});

mongoose.connect('mongodb+srv://lhug:ZER2k66*o5@cluster-zebvi.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

require('./models/Enseignant');
require('./models/Statut');
require('./models/Projet');
require('./models/Formation');

var app = express();


app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/images',express.static(__dirname + '/images'));
app.use('/', require('./routes/statuts'));
app.use('/', require('./routes/enseignants'));
app.use('/', require('./routes/formations'));
app.use('/', require('./routes/projet'));
app.use('/', require('./routes/accueil'));
app.use('/', require('./routes/decomposition'));

nunjucks.configure('views',{
    autoescape: true,
    express: app
});

console.log('application lancé sur le port 3000');
app.listen(3000);
