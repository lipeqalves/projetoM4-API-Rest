import express from "express";
import * as dotenv from "dotenv";
import Alunos from "./src/controllers/Alunos.js";
import Cursos from "./src/controllers/Cursos.js";
import Turmas from "./src/controllers/Turmas.js";
//import Matricula from "./src/controllers/Matricula.js"

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

app.use(express.json());

Alunos.rotas(app);
Cursos.rotas(app);
Turmas.rotas(app);
//Matricula.rotas(app);

