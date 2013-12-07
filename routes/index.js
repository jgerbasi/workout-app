var mongo = require("../models/mymongo.js");

exports.index = function(req, res) {
  res.render('index', {title: 'MongoDB Test'})
};

// /:db/:collection/:operation
exports.mongo = function(req, res){
	switch (req.params.operation) {
		case 'insert':	mongo.insert( req.params.db, 
		                              req.params.collection, 
		                              req.query,
		                              function(model) {
		                                res.render('mongo', {title: 'Mongo Demo', obj: model});
		                                }
		                              );
									 	break;
		case 'find':		mongo.find( req.params.db, 
		                              req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('mongo',{title: 'Mongo Demo', obj: model});
		                                }
		                              );
									 	break;
		case 'update':	mongo.update( req.params.db, 
		                              req.params.collection, 
		                              req.query,
		                              function(model) {
              											res.render('success',{title: 'Mongo Demo', obj: model});
		                                }
		                              );
									 	break;
		}
	}
	
