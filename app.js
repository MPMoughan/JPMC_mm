var express = require('express'),
    app = express();
    var routeMiddleware = require("./config/routes");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index');
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});