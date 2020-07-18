//Configuração do servidor
const express = require("express");
const server = express();

//Configurar o servidor para apresentar os arquivos estáticos
server.use(express.static('public'));

//Habilitat Body(corpo) do formulário
server.use(express.urlencoded({extended:true}))

//Configurar a conexão com o banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

//Configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});

//Configurar a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html", {donors});
});

server.post("/", function(req, res){
    //Pegar os dados do formulário (inputs)
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //Verifica se o valor é vazio antes de ser colocado no banco de dados
    if (name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios.")
    }

    //Coloco valores dentro do banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood") 
                    VALUES ($1, $2, $3)`;

    const values = [name, email, blood];

    db.query(query, values, function(){
        
    })

    return res.redirect("/");
});

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Iniciei o servidor!");
});
