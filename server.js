const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Permite ler JSON enviado pelos formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(__dirname));

// Rota para receber pedidos
app.post("/enviar-pedido", (req, res) => {

        const {
            nome,
            sabor,
            tamanho,
            sabor2,
            tamanho2,
            bebida,
            paoDeAlho,
            pizzaDoce,
            borda,
            observacao,
            promocao,
            contato,
            endereco, 
        } = req.body;

        const novoPedido = {
            promocao: promocao || null,
            nome: nome || null,
            sabor: sabor || null,
            tamanho: tamanho || null,
            sabor2: sabor2 || null,
            tamanho2: tamanho2 || null,
            bebida: bebida || null,
            paoDeAlho: paoDeAlho || null,
            pizzaDoce: pizzaDoce || null,
            borda: borda || null,
            observacao: observacao || "",
            contato: contato || null,
            endereco: endereco || null,   
            data: new Date().toLocaleString("pt-BR")
        };

    const filePath = path.join(__dirname, "pedidos.json");

    let pedidos = [];
    if (fs.existsSync(filePath)) {
        pedidos = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    pedidos.push(novoPedido);

    fs.writeFileSync(filePath, JSON.stringify(pedidos, null, 2));

    res.json({ mensagem: "Pedido enviado com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
