var app = require('express')();
var bodyParser = require('body-parser');
var alexaSkill = require('./skill');

app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());


app.post('/', function(request,response, next) {

	alexaSkill.handler(request.body, { 
		fail: function(error){ next(error); }, 
		succeed: function(result){ response.json(result); } }, 
		function(err,msg) { if(err) return next(err); return response.json(msg); }
	);
});

app.get('/', function(request,response){
  response.send('<h1>Alexa Skill Application</h1>');
});

app.listen(3000, function(request,response){
	console.log('app listening on port 3000');
});