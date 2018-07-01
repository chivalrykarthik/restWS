/*var user = require('./model/user.js'),
	auth = require('./model/auth.js');*/

let Users = require('./controller.js');
let usersObj = new Users();
module.exports = function(app){
	app.get('/user',function(req,resp){
		usersObj.getUser(req,resp)
		
	});
	app.get('/user/:id',function(req,resp){		
		usersObj.getUserById(req.params.id,resp);
		
	});
	app.post('/user',function(req,resp){
		usersObj.createUser(req.body,resp);
		//resp.json({});
	});
	
	app.put('/user/:id',function(req,resp){
		let reqObj = {
			id:req.params.id,
			body:req.body
		}
		usersObj.updateUser(reqObj,resp);
	});
	app.delete('/user/:id',function(req,resp){
		
		resp.json({});
	});
	
	
	
};