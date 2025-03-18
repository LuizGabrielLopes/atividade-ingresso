const ingressoModel = require("../models/ingressoModel");

const getAllIngresso = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngresso();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar por ingressos." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({message: "Erro ao buscar ingresso."
        });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;

        if (categoria === "Pista" && preco < 100) {
            return res.status(400).json({ message: "O preço mínimo para Pista é R$100,00." });
        } else if (categoria === "Pista VIP" && preco < 200) {
            return res.status(400).json({ message: "O preço mínimo para Pista VIP é R$200,00." });
        } else if (categoria === "Camarote" && preco < 300) {
            return res.status(400).json({ message: "O preço mínimo para Camarote é R$300,00." });
        } else if (categoria === "Arquibancada" && preco < 80) {
            return res.status(400).json({ message: "O preço mínimo para Arquibancada é R$80,00." });
        }

        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Ingresso já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado"})
        }
        res.json(updatedIngresso)
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o ingresso" });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o ingresso."});
    }
};

const vendaIngresso = async (req, res) => {
    try {
        const { id, quantidade_compra } = req.body;
        const ingresso = await ingressoModel.getIngressoById(id);

        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        if (ingresso.quantidade_disponivel < quantidade_compra) {
            return res.status(400).json({ message: "Quantidade de ingressos insuficiente." });
        }

        const novaQuantidade = ingresso.quantidade_disponivel - quantidade_compra;
        const updatedIngresso = await ingressoModel.updateIngresso(id, ingresso.evento, ingresso.local, ingresso.data_evento, ingresso.categoria, ingresso.preco, novaQuantidade);

        res.status(201).json({ message: "Compra realizada com sucesso", ingresso: updatedIngresso });
    } catch (error) {
        res.status(500).json({ message: "Erro ao realizar a compra." });
    }
};

module.exports = { getAllIngresso, getIngresso, createIngresso , updateIngresso, deleteIngresso, vendaIngresso };