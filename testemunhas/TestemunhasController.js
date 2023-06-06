const express = require("express");
const router = express.Router();
const Testemunha = require("../models/testemunha");


// Função para validar os campos obrigatórios
const validateFields = (nome, email, depoimento) => {
    if (!nome || !email || !depoimento) {
        return false;
    }
    return true;
};

// API PARA CADASTRAR
router.post("/depoimento", (req, res) => {
    const { nome, email, depoimento } = req.body;

    console.log(nome, email, depoimento);

    if (!validateFields(nome, email, depoimento)) {
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    }

    Testemunha.create({
        nome: nome,
        email: email,
        depoimento: depoimento,
    })
        .then((dadoscadastro) => {
            console.log(dadoscadastro.toJSON()); // Linha para limpeza de Dados
            res.status(201).send("Dados enviados com sucesso");
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Erro ao cadastrar");
        });
});


// API PARA EXIBIÇÃO DE DADOS
router.get("/depoimentos", (req, res) => {
    Testemunha.findAll({})
        .then((Testemunhas) => {
            console.log(Testemunhas.map((testemunha) => testemunha.toJSON())); // Linha para limpeza de Dados
            res.status(200).send(Testemunhas);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Erro ao buscar depoimentos");
        });
});

// API PARA ATUALIZAR OS DADOS EXISTENTES
router.put("/depoimento/editar/:id", (req, res) => {
    const id = req.params.id;
    const { nome, depoimento } = req.body;

    if (!nome || !depoimento) {
        res.status(400).send("Nome e depoimento são campos obrigatórios");
        return;
    }

    Testemunha.update(
        { nome: nome, depoimento: depoimento },
        { where: { id: id } }
    )
        .then((result) => {
            if (result[0] === 0) {
                res.status(404).send("Testemunha não encontrada");
            } else {
                res.status(200).send("Testemunha atualizada com sucesso");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Erro ao atualizar Testemunha");
        });
});
// API PARA EXCLUSÃO DE DADOS EXISTENTES
router.delete("/depoimento/:id", (req, res) => {
    const id = req.params.id;

    Testemunha.destroy({
        where: { id: id },
    })
        .then((result) => {
            if (result === 0) {
                res.status(404).send("Testemunha não encontrada");
            } else {
                res.status(200).send("Testemunha deletada com sucesso");
                console.log("Usuário deletado com sucesso!");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Erro ao deletar Testemunha");
        });
});

module.exports = router;
