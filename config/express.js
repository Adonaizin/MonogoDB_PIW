
var express = require('express');
var usuariosRouter = require('../app/routes/usuarios.js');
var postsRouter = require('../app/routes/posts.js');
let bodyParser = require('body-parser');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    usuariosRouter(app);
    postsRouter(app);
    
    return app;
};