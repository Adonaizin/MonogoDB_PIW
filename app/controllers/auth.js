let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario.js');

module.exports.checar = function (req, res, next) {
    jwt.verify(req.headers['token'], 'secret', 
                function (err, decoded) {
                    if (err) {
                        return res.status(401).json({
                            title: 'Não autenticou',
                            error: err
                        });
                    }else{
                        next();
                    };
                })
};

module.exports.logar = function(req,res){
    function logar(user){
        if(!bcrypt.compareSync(req.body.senha, user.senha)){
            falhar();
        }else{
            let token = jwt.sign({id:user._id}, 'secret');
            res.status(200).json({
                message:"Logado",
                token: token,
                userId: user._id
            })
        }
    }
    function falhar(){
        res.status(401).send('Invalid login');
    }
Usuario.findOne({email:req.body.email}).exec().then(logar,falhar);
}