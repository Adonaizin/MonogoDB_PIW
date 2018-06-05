// var modulo = require('./novo_modulo.js');
// console.log(modulo.f());
// console.log("Hello World");

var http = require('http');
var app = require('./config/express.js')();
var db = require('./config/database.js');

http.createServer(app).listen(app.get('port'),function(){
console.log("Servidor rodando");
});
db('mongodb://localhost:27017/atividades8e9e10');
