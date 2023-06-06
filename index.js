const express = require("express")
const app = express()
const cors = require("cors")

// Import BD
const conexaodb = require("./database/db")
//Import Controllers
const TestemunhasController = require("./testemunhas/TestemunhasController")

//utilizando o EXPRESS
app.use(cors())
app.use(express.json())

//Conexao c banco de dados
conexaodb
    .authenticate()
    .then(() => {
        console.log("Conexão feita!")
    }).catch((error) => {
        console.log(error)
    })




//API'S
app.get("/", (req, res) => {
    res.send("hi")
})

app.use('/', TestemunhasController)

// Porta do servidor
const port = 8080;
app.listen(port, () => {
    console.log(`Aplicação on-line! Acesse http://localhost:${port}`);
});
