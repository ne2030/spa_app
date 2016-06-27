var express = require('express');
var swig = require('swig');
var consolidate = require('consolidate');
var path = require('path');

var app = express();

app.engine('html', consolidate.swig);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/img')));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function(req,res){
    res.render('index');
});



app.listen(8080, function(){
    console.log('server is running at localhost with port 8080');
});
