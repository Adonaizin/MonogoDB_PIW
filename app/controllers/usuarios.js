let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario.js');
var Post = require('../models/post.js');

module.exports.listaUsuarios = function(req, res){
    let promise = Usuario.find().exec();
    promise.then(
        function(usuarios){
            res.json(usuarios)
        },
        function(erro){
            res.status(500).end();
        }
    );
};
module.exports.obterUsuario = function(req, res){
    var id = req.params.id;
    let promise = Usuario.findById(id);
    promise.then(
        function(usuario){
            res.json(usuario)
        },
        function(erro){
            res.status(500).send('Usuario não encontrado');
        }
    );
};
module.exports.inserirUsuario = function(req, res){
    let usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    })
    let token = jwt.sign({usuario: usuario},'secret')
    let promise = Usuario.create(usuario);
    promise.then(
        function(usuario) {
            res.status(201).json(token);
        },
        function(error){
            res.status(500).send(erro);
        }
    );
};

module.exports.editarUsuario = function(req, res){

    let decoded = jwt.decode(req.headers['token']);
    console.log(decoded);
    let idTokenUser = decoded.id;

    let promise = Usuario.update(Usuario.findById(idTokenUser), req.body);
    promise.then(
        function(usuario){
            res.json(usuario)
        },
        function(erro){
            res.status(404).send('Usuario não encontrado');
        }
    );
};

module.exports.deletarUsuario = function(req, res){

    let decoded = jwt.decode(req.headers['token']);
    let idTokenUser = decoded.id;

    let promise = Usuario.findByIdAndRemove(idTokenUser);
    
    promise.then(
        function(usuario){
            res.json(usuario)
        },
        function(erro){
            res.status(404).send('Usuario não encontrado');
        }
    );
};
module.exports.obterPostsDoUsuario = function(req, res){
    let promise = Post.find({"uid":req.params.id}).exec();
    promise.then(
        function(posts){
            res.json(posts)
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    );
};