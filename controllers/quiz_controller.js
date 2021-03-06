var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.find({
		where: {id: Number(quizId) },
		include: [{model: models.Comment}]
	}).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId='+ quizId));
			}
		}
	).catch(function(error) {next(error)});
}

exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

exports.index = function(req, res) {
		var wh = req.query.search ? "%"+req.query.search+"%" : "%";
		wh = wh.replace(" ", "%");
		models.Quiz.findAll({where:["pregunta like ?", wh]}).then(function(quizes) {
		res.render('quizes/index', {quizes: quizes, errors: []});
	}).catch(function(error){next(error)})
}

exports.answer = function(req, res) {

	var resultado = "Incorrecto"; var color = "";
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcto";
		color = "OK";
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, color: color, errors: []});

}

exports.author = function(req, res) {
	res.render('author',  {errors: []});
}

exports.new = function(req, res) {
	var quiz = models.Quiz.build (
		{pregunta: "", respuesta: "", tema:""}
	);
	
	res.render('quizes/new', {quiz: quiz, errors: []});
}

exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
					if (err) {
						res.render('quizes/new', {quiz: quiz, errors: err.errors});
					} else {
						quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function() {
							res.redirect('/quizes');
						})
					}
				});
	
}

exports.edit = function(req, res) {
	var quiz = req.quiz;
	
	res.render('quizes/edit', {quiz: quiz, errors: []});
}

exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
console.log(req.body.quiz);
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz
	.validate()
	.then(
		function(err) {
			if (err) {
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
			} else {
				req.quiz
				.save ({fields: ["pregunta", "respuesta", "tema"]})
				.then (function() {res.redirect('/quizes')});
			}
		}
	)
}

exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect('/quizes');
	}).catch(function(error) {next(error)});
}