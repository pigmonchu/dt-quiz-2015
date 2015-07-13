var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
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
	res.render('quizes/show', {quiz: req.quiz});
};

exports.index = function(requ, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index', {quizes: quizes});
	}).catch(function(error){nex(error)})
}

exports.answer = function(req, res) {

	var resultado = "Incorrecto"; var color = "";
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = "Correcto";
		color = "OK";
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, color: color});

}

exports.author = function(req, res) {
	res.render('author', {});
}