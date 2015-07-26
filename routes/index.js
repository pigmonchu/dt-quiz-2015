var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

 //Autoloads
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Autenticación
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

//Preguntas
router.get('/quizes', sessionController.timeInRequired, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.timeInRequired, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.timeInRequired, quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.timeInRequired, sessionController.loginRequired, quizController.edit);
router.get('/quizes/new', sessionController.timeInRequired, sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.timeInRequired, sessionController.loginRequired, quizController.create);
router.put('/quizes/:quizId(\\d+)', sessionController.timeInRequired, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.timeInRequired, sessionController.loginRequired, quizController.destroy);

router.get('/author', sessionController.timeInRequired, quizController.author);

//Comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.timeInRequired, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.timeInRequired, commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.timeInRequired, sessionController.loginRequired, commentController.publish)
                                  

module.exports = router;
