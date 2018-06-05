var Post = require('../models/post.js');
var Usuario = require('../models/usuario.js');
let jwt = require('jsonwebtoken');

module.exports.listaPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(
        function(posts){
            res.json(posts)
        },
        function(erro){
            res.status(500).end();
        }
    );
};
module.exports.obterPost = function(req, res){
    var id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(post){
            res.json(post)
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    );
};
module.exports.inserirPost = function(req, res){
    let decoded = jwt.decode(req.headers['token']);
    console.log(decoded);
    let idTokenUser = decoded.id;
    let post = new Post({
        texto: req.body.texto,
        likes: req.body.likes,
        uid: idTokenUser
    });
    let promise = Post.create(post);
    promise.then(
        function(post) {
            res.status(201).json(post);
        },
        function(error){
            res.status(500).send(erro);
        }
    );
};
module.exports.editarPost = function(req, res){
    var id = req.params.id;

    let decoded = jwt.decode(req.headers['token']);
    // console.log(decoded);
    let idTokenUser = decoded.id;
    let post = Post.findById(id);
    post.then(
        function(post){
            let idUserPost = post.uid;
            (function(){
                if(idTokenUser == idUserPost){
                    let promise = Post.update(Post.findById(id), req.body);
                        promise.then(
                            function(postEditado){
                                res.json(postEditado)
                            },
                            function(erro){
                                res.status(404).send('Post não encontrado');
                            }
                        );
                }else{
                    res.status(401).send('Esse post não te pertence')
                }
            })()
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    );

    // console.log(post)

};
module.exports.deletarPost = function(req, res){
    var id = req.params.id;

    let decoded = jwt.decode(req.headers['token']);
    console.log(decoded);
    let idTokenUser = decoded.id;
    let post = Post.findById(id).exec();
    let uid;
    post.then(
        function(post){
            uid = post.uid;
            (function(){
                if(idTokenUser == uid){
                    let promise = Post.findByIdAndRemove(id);
                    promise.then(
                        function(post){
                            res.status(200).json(post);
                        },
                        function(erro){
                            res.status(500).json(erro);
                        }
                    )
                }else{
                    res.status(401).send('Esse post não te pertence')
                }
            })();
        },
        function(erro){
            res.status(404).send('Post não encontrado');
        }
    )
    
};
module.exports.obterUsuarioDoPost = function(req, res){
    let post = Post.findById(req.params.id).exec();
    let id;
    post.then(
        function(post){
            console.log(post);
            id = post.uid;
            (function(){
                let promise = Usuario.find({'_id':id}).exec();
                promise.then(
                    function(usuario){
                        res.json(usuario);
                    },
                    function(erro){
                        res.status(404).json(erro);
                    }
                )
            }());
        },
        function(erro){
            console.log(erro);
        }
    )
};