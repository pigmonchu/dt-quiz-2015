module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',{
			pregunta: {
				type: DataTypes.STRING, 
				validate: {notEmpty: {msg: "-> Falta pregunta"}}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "-> Falta respuesta"}}
			}, 
			tema: {
				type: DataTypes.STRING, 
				validate: { 
							notEmpty: {msg: "-> Falta tema"},
							isIn: {args: [['otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia']], msg: "-> el tema debe ser humanidades, ocio, ciencia, tecnologia u otro" }
				}
			}
		});
}