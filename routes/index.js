var mongo = require("../models/mymongo.js");

exports.index = function(req, res) {
	mongo.find(
							req.session.username,
							function(model) {
								res.render('index', {title: 'Welcome to the Workout App', workouts: model[0].workouts, username: req.session.username});
							}
						);
};

exports.login = function(req, res) {
	res.render('login', {title: 'Welcome to the Workout App'});
}

exports.newWorkout = function(req, res) {
	res.render('new', {title: 'New Workout', username: req.session.username});
};

exports.createWorkout = function(req, res) {
	mongo.update( 
								req.session.username, 
								req.body,
								function(model) {
									res.end("Successfully posted new workout");
								}
							);
};

exports.getWorkouts = function(req, res) {
	mongo.find(
							req.session.username,
							function(model) {
								res.render('sessions', {title: 'Viewing Workout Sessions', obj: model[0].sessions, username: req.session.username});
							}
						);
};

exports.getWorkout = function(req, res) {
	mongo.find(
											req.session.username,
											function(model) {
												res.render('workout', {title: 'Viewing Workout', obj: model[0].workouts[req.params.id], username: req.session.username});
											}
										);
};

exports.createSession = function(req, res) {
	mongo.updateSession( 
							req.session.username, 
							req.body,
							function(model) {
								res.end("Successfully posted new session");
							}
						);
}