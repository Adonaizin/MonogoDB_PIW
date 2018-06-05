
let controller = require("../controllers/usuarios.js");
let auth = require('../controllers/auth.js');

module.exports = function(app){
    app.post('/api/usuarios/signin',auth.logar);
    app.post("/api/usuarios",controller.inserirUsuario);
    app.get("/api/usuarios",controller.listaUsuarios);
    app.get("/api/usuarios/:id",controller.obterUsuario);
    app.get("/api/usuarios/:id/posts",controller.obterPostsDoUsuario);
    app.use('/api/usuarios/',auth.checar);
    app.put("/api/usuarios", controller.editarUsuario);
    app.delete("/api/usuarios", controller.deletarUsuario);
}