var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

console.log("DB_name: "+DB_name);
console.log("user: "+user);
console.log("pwd: "+pwd);
console.log("protocol: "+protocol);
console.log("dialect: "+dialect);
console.log("port: "+port);
console.log("host: "+host);

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, {
		dialect: dialect,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,
		omitNull: true
	}
);

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function() {
	Quiz.count().then(function(count){
		if (count === 0) {
			Quiz.create({
					pregunta: 'Capital de Italia',
					respuesta: 'Roma'
				});
			Quiz.create({
					pregunta: 'Capital de España',
					respuesta: 'Madrid'
				});
			Quiz.create({
					pregunta: 'Capital de Argentina',
					respuesta: 'Buenos Aires'
				});
			Quiz.create({
					pregunta: 'Capital de Brasil',
					respuesta: 'Brasilia'
				});
			Quiz.create({
					pregunta: 'Número de patas de un insecto',
					respuesta: '6'
				});
			Quiz.create({
					pregunta: 'Número de patas de una araña',
					respuesta: '8'
				})
			.then(function(){console.log('Base de datos inicializada')});
		};	
	});
});