const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Permite ler JSON enviado pelo formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(__dirname));

// Rota para receber pedidos
app.post("/enviar-pedido", (req, res) => {
   const { nome, sabor, tamanho, bebida, bordaRecheada, observacao } = req.body;

    // Verificação de campos obrigatórios
    if (!nome || !sabor || !tamanho) {
        return res.status(400).json({ erro: "Preencha ao menos nome, sabor e tamanho." });
    }

    // Criar estrutura do pedido
    const novoPedido = {
        nome,
        sabor,
        tamanho,
        bebida: bebida || "Nenhuma",
        bordaRecheada: bordaRecheada || "Nenhuma",
        observacao: observacao || "",
        data: new Date().toLocaleString("pt-BR")
    };

    // Caminho para salvar pedidos
    const filePath = path.join(__dirname, "pedidos.json");

    // Se o arquivo não existir, cria lista vazia
    let pedidos = [];
    if (fs.existsSync(filePath)) {
        pedidos = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Adiciona novo pedido
    pedidos.push(novoPedido);

    // Salva no arquivo
    fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2));

    res.json({ mensagem: "Pedido enviado com sucesso!" });
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
