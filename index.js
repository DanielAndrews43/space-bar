var path = require('path');
var express = require('express');
var app = express();
var router = express.Router();
var backend = require('./backend/backend.js');

var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(path.join(__dirname + '/public')));
app.use('/backend', express.static(path.join(__dirname + '/backend')));

//Home Page Route
router.get('/', function(req, res, next){
    res.render('pages/index', { title: 'Spacebar'})
});
app.use('/', router);

// views is directory for all template files
app.set('views', __dirname + '/site/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

router.get('/addone', function(req, res, next) {
    backend.handler(function(err,data) {
        res.send(String(data))
        next();
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});