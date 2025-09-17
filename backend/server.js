const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const alunoRoutes = require("./routes/tb_aluno");
const disciplinaRoutes = require("./routes/tb_disciplinas"); 

app.use("/tb_aluno", alunoRoutes);
app.use("/tb_disciplinas", disciplinaRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});