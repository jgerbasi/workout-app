var express = require('express')
  , routes = require('./routes')

var app = express();

var mongoExpressAuth = require('mongo-express-auth');
  
// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public/'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

//===========================
//  init
//===========================
mongoExpressAuth.init({
  mongo: { 
    dbName: 'workoutApp',
    collectionName: 'users'
  }
}, function(){
    console.log('Mongo ready!\n Server running on port: 3000');
    app.listen(3000);
});

// Routes (auth based)
app.get('/', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send('You are not logged in!');
    else
      routes.index(req, res);
  });
});

app.post('/login', function(req, res){
  mongoExpressAuth.login(req, res, function(err){
    if (err)
      res.send(err);
    else
      res.send('ok');
  });
});

app.post('/logout', function(req, res){
  mongoExpressAuth.logout(req, res);
  res.send('ok');
});

app.post('/register', function(req, res){
  mongoExpressAuth.register(req, function(err){
    if (err)
      res.send(err);
    else
      res.send('ok');
  });
});

app.get('/workouts/new', routes.newWorkout);
app.post('/workouts', routes.createWorkout);
app.get('/workouts', routes.getWorkouts);
app.get('/workouts/:id', routes.getWorkout);
app.post('/sessions', routes.createSession);