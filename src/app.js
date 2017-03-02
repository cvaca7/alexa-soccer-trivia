var app = require('express')();
var bodyParser = require('body-parser');
var alexaSkill = require('./skill');

app
    .use(bodyParser.urlencoded( { extended: false } ))
    .use(bodyParser.json())
    .post('/', (request,response,next)  => {
        alexaSkill.handler( request.body,  {
            fail: next,
            succeed: (msg) => {
            response.json(msg);
            }
        },  (error,msg) => {
            if(error) return next(err);
            return response.json(msg);
        } );
    })
    .get('/', (request,response) => {
        response.send('<h1>Alexa Skill Application</h1>');
    })
    .listen(3000, (request,response) => {
        console.log('App listening on port 3000');
    });
/*
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
    */