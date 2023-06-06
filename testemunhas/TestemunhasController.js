const express = require("express")
const router = express.Router()
const Testemunha = require("../models/testemunha")


//API PARA CADASTRAR
router.post("/enviardados", (req, res) => {
    const { nome, email, depoimento } = req.body

    console.log(nome, email, depoimento)

    Testemunha.create({
        nome: nome,
        email: email,
        depoimento: depoimento,
    }).then((dadoscadastro) => {
        console.log(dadoscadastro.toJSON()) // Linha para limpeza de Dados
        res.send("Dados enviado")
    })

})

//API PARA EXIBIÇÃO DE DADOS
router.get("/depoimentos", (req, res) => {
    Testemunha.findAll({
    }).then((Testemunhas) => {
        console.log(Testemunhas.map(Testemunhas => Testemunhas.toJSON())) // Linha para limpeza de Dados
        res.send(Testemunhas)
    }).catch((error) => {
        console.log(error)
    })
})

//API PARA ATUALIZAR OS DADOS EXISTENTES
router.put('/depoimentos/update/:id', (req, res) => {
    const id = req.params.id;
    const { nome, email, depoimento } = req.body;

    Testemunha.update(
        { nome: nome, email: email, depoimento: depoimento },
        { where: { id: id } }
    )
        .then(() => {
            res.status(200).send('Testemunha atualizada com sucesso!');
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Erro ao atualizar Testemunha');
        });
});

// API PARA EXCLUSÃO DE DADOS EXISTENTES
router.delete('/depoimentos/delete/:id', (req, res) => {
    const id = req.params.id;

    Testemunha.destroy({
        where: { id: id }
    })
        .then(() => {
            res.status(200).send('Usuário deletado com sucesso!');
            console.log('Usuario deletado com sucesso!');
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send('Erro ao deletar Testemunha');
        });
});








module.exports = router;