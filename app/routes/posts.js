
let controller = require("../controllers/posts.js");

module.exports = function(app){
    app.get("/api/posts",controller.listaPosts);
    app.get("/api/posts/:id",controller.obterPost);
    app.post("/api/posts",controller.inserirPost);
    app.put("/api/posts/:id", controller.editarPost);
    app.delete("/api/posts/:id", controller.deletarPost);
    app.get("/api/posts/:id/usuario",controller.obterUsuarioDoPost);
}