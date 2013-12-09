var mongo = require("../models/mymongo.js");

exports.index = function(req, res) {
	mongo.find(
							req.session.username,
							function(model) {
								res.render('index', {title: 'Welcome to the Workout App', workouts: model[0].workouts});
							}
						);
};

exports.newWorkout = function(req, res) {
	res.render('new', {title: 'New Workout'});
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
								res.render('mongo', {title: 'Viewing Workouts', obj: model});
							}
						);
};

exports.getWorkout = function(req, res) {
	mongo.find(
											req.session.username,
											function(model) {
												res.render('workout', {title: 'Viewing Workout', obj: model[0].workouts[req.params.id]});
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