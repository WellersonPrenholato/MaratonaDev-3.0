//Configuração do servidor
const express = require("express");
const server = express();

//Configurar o servidor para apresentar os arquivos estáticos
server.use(express.static('public'));

//Habilitat Body(corpo) do formulário
server.use(express.urlencoded({extended:true}))

//Configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});

//Lista de doadores
const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "AB+"
    },
    {
        name: "Robson Marques",
        blood: "O-"
    },
    {
        name: "Wellerson Prenholato",
        blood: "O-"
    },
]

//Configurar a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){
    //Pegar os dados do formulário (inputs)
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //Coloco valores dentro do array
    donors.push({
        name:name,
        blood:blood,
    })

    return res.redirect("/");
});

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor!");
});
