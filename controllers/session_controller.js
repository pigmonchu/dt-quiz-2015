exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

exports.timeInRequired = function(req, res, next) {
	if (!req.session.user) {
//console.log("*** NO EXISTE SESION ***");
		next();
	} else {
		var actualTime = new Date().getTime(); 
//console.log('session.lastTime: '+req.session.lastTime);
//console.log('session.maxTime:  '+req.session.maxTime);
//console.log('actualTime:       '+actualTime);
		if (actualTime - req.session.lastTime <= req.session.maxTime) {
//console.log("*** ULTIMA ACTIVIDAD MENOR DE MAX TIME ***");
			req.session.lastTime = actualTime;
			next();
		} else {
//console.log("*** ULTIMA ACTIVIDAD MAYOR DE MAX TIME ("+req.session.maxTime+") ***");
			res.redirect('/logout');
		}
	}
}

exports.new = function(req, res) {
//console.log("Al crear maxTime: "+req.session.maxTime);
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render('sessions/new', {errors: errors});
}

exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id:user.id, username: user.username};
		req.session.lastTime = new Date().getTime();
//console.log('session.lastTime: '+req.session.lastTime);
//console.log('session.maxTime: '+req.session.maxTime);

		res.redirect(req.session.redir.toString());
	});
}

exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}

