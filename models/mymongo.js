var util = require("util");
var mongoClient = require("mongodb").MongoClient;
var database = "mongodb://localhost:27017/workoutApp";

//db/:collection/:operation/:document
var doError = function (e) {
	util.debug("ERROR: "+e);
	throw new Error(e);
	}

// INSERT
// exports.insert = function(collection, query, callback) {
//   mongoClient.connect(database, function(err, db) {
//     if (err) doError(err);
//     db.collection(collection).insert(query, {safe:true}, function(err, crsr) {
//       callback(crsr);
//   		});
//   	});
//   }
				
// // FIND
// exports.find = function(collection, query, callback) {
//   mongoClient.connect(database, function(err, db) {
//     if (err) doError(err);
//     var crsr = db.collection(collection).find(query);
//       crsr.toArray(function(err, docs) {
//         if (err) doError(err);
//         callback(docs);
//         });
//   		});
//   	}

// Get user's workouts
exports.find = function(user, callback) {
  mongoClient.connect(database, function(err, db) {
    if (err) doError(err);
    var crsr = db.collection("users").find({ username: user });
    crsr.toArray(function(err, docs) {
      if (err) doError(err);
      callback(docs);
    });
  });
}

// exports.getWorkout = function(user, workout, callback) {
//   mongoClient.connect(database, function(err, db) {
//     if (err) doError
//   });
// }

// Add new workout for user
exports.update = function(user, workout, callback) {
  mongoClient.connect(database, function(err, db) {
    if (err) doError(err);
    db.collection("users").findAndModify(  
                                    { username: user }, // find query
                                    [['_id','asc']], // sort options
                                    { $push: { workouts: workout } }, // data to update
                                    { new: true }, // return the updated record
                                    function(err, crsr) {
                                      if (err) doError(err);
                                      callback(crsr);
                                    }
                                  );
  	});
  }

// Add new session for user
exports.updateSession = function(user, session, callback) {
  mongoClient.connect(database, function(err, db) {
    if (err) doError(err);
    db.collection("users").findAndModify(  
                                    { username: user }, // find query
                                    [['_id','asc']], // sort options
                                    { $push: { sessions: session } }, // data to update
                                    { new: true }, // return the updated record
                                    function(err, crsr) {
                                      if (err) doError(err);
                                      callback(crsr);
                                    }
                                  );
    });
  }

