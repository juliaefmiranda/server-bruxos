import express from "express";
import dados from "./src/data/dados.js";

const { bruxos, casas, varinhas, animais, pocoes } = dados;

const serverPort = 3003;
const app = express();

app.use(express.json());

// Rota principal - Hogwarts
app.get("/", (req, res) => {
  res.send(`
    <div style="
      background: linear-gradient(135deg, #1a237e, #3949ab);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        ⚡ Bem-vindo à Hogwarts! ⚡
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
        🏰 Escola de Magia e Bruxaria
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "É preciso muito mais que coragem para enfrentar nossos inimigos, 
        mas muito mais ainda para enfrentar nossos amigos."
      </p>
      <div style="margin-top: 30px;">
        <span style="font-size: 1.1rem;">🦁 Grifinória | 🐍 Sonserina | 🦅 Corvinal | 🦡 Lufa-lufa</span>
      </div>
    </div>
  `);
});

// Rota dos bruxos
app.get("/bruxos", (req, res) => {
  res.json(bruxos);
});

//Rota GET by ID
app.get("/bruxos/:id", (req, res) => {
  //Pega o ID da URL e transforma em número
  const id = parseInt(req.params.id);

  //Busca o bruxo no array/objeto/json
  const bruxo = bruxos.find((b) => b.id === id);

  //Verificar se existe e se existir, retornar o status 200 e o res
  if (bruxo.length > 0) {
    res.status(200).json(bruxo);
  } else {
    //Se não existir, enviar na resposta um feedback e o status 404
    res.status(404).json({
      mensagem: "Bruxo não encontrado!",
    });
  }
});

//Rota GET by Name
app.get("/bruxos/nome/:nome", (req, res) => {
  //Pega o nome da URL
  let nome = req.params.nome.toLowerCase();

  //Burca no array/objeto/json usando "contains"
  const bruxosEncontrados = bruxos.filter((b) =>
    b.nome.toLowerCase().includes(nome)
  );

  //Verificar se existe e se existir, retornar o status 200 e o res
  if (bruxosEncontrados.length > 0) {
    res.status(200).json(bruxosEncontrados);
  } else {
    //Se não existir, enviar na resposta um feedback e o status 404
    res.status(404).json({
      mensagem: "Bruxo(s) não encontrado(s)!",
    });
  }
});

//Rota GET by Casa
app.get("/bruxos/casa/:casa", (req, res) => {
  // Pegar a casa da url
  let casa = req.params.casa;
  // Buscar no array/objeto/json
  const bruxosDaCasa = bruxos.filter((b) => b.casa === casa);

  if (bruxosDaCasa.length > 0) {
    // Se existir enviar na resposta com o res e o status 200
    res.status(200).json(bruxosDaCasa);
  } else {
    // Se nao existir, enviar na resposta um feedback e o status 400
    res.status(404).json({
      mensagem: "Nenhum bruxo encontrado nessa casa!",
    });
  }
});

app.get("/casas", (req, res) => {
  if (casas.length > 0) {
    res.status(200).json(casas);
  } else {
    res.status(404).json({
      mensagem: "Nenhuma casa encontrada!",
    });
  }
});

app.get("/varinhas", (req, res) => {
  if (varinhas.length > 0) {
    res.status(200).json(varinhas);
  } else {
    res.status(404).json({
      mensagem: "Nenhuma varinha encontrada!",
    });
  }
});

app.get("/animais", (req, res) => {
  if (animais.length > 0){
    res.status(200).json(animais);
  } else {
    res.status(404).json({
      mensagem: "Nenhum animal enccontrado!"
    });
  }
});

app.get("/pocoes", (req, res) => {
  if (pocoes.length > 0){
    res.status(200).json(pocoes);
  } else {
    res.status(404).json({
      mensagem: "Nenhuma poção encontrada!"
    });
  }
});

// Iniciar servidor
app.listen(serverPort, () => {
  console.log(
    `⚡ Servidor Hogwarts iniciado em: http://localhost:${serverPort}`
  );
  console.log(`🧙‍♂️ API dos Bruxos está no ar na porta 3000!`);
});
