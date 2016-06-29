var express = require('express'),
    swig = require('swig'),
    consolidate = require('consolidate'),
    path = require('path'),
    sequelize = require('sequelize'),
    async = require('async');

var app = express();

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'app/vies')));

app.get('/', function(req,res){
    res.render('index');
});

// sequelize.sequelize.sync({
//   force: true
// }).then(function() {
//           require('./config/seed')(sequelize);
//       }
//   );



app.listen(8080, function(){
    console.log('server is running at localhost with port 8080');
});
