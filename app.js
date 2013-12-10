var express = require('express')
  , routes = require('./routes')

  // CREDIT FOR MAIN AUTH MODULE (GUTTED BY ME TO WORK WITH NODEJITSU)
  // https://github.com/es92/mongo-express-auth
  , mongoExpressAuth = require('./auth/mongoExpressAuth');

var app = express();

// var mongoExpressAuth = require('mongo-express-auth');
  
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
    host: 'ds047008.mongolab.com',
    port: 47008,
    dbName: 'workoutApp',
    collectionName: 'users'
  }
}, function(){
    console.log('Mongo ready!\n Server running on port: 80');
    app.listen(3000);
});

// Routes (auth based)
app.get('/', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      routes.login(req, res);
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

app.get('/workouts/new', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send("You need to be logged in to access this!");
    else
      routes.newWorkout(req, res);
  });
});

app.get('/workouts/:id', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send("You need to be logged in to access this!");
    else
      routes.getWorkout(req, res);
  });
});

app.get('/workouts', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send("You need to be logged in to access this!");
    else
      routes.getWorkouts(req, res);
  });
});


app.post('/workouts', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send("You need to be logged in to access this!");
    else
      routes.createWorkout(req, res);
  });
});

app.post('/sessions', function(req, res){
  mongoExpressAuth.checkLogin(req, res, function(err){
    if (err)
      res.send("You need to be logged in to access this!");
    else
      routes.createSession(req, res);
  });
});