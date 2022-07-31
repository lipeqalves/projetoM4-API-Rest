import DatabaseTurmasMetodos from "../DAO/DatabaseTurmasMetodos.js";
import ValidacoesTurmas from "../services/ValidacoesTurmas.js";
import TurmasModel from "../models/TurmasModels.js";

class Turmas {
  static rotas(app) {
    app.get("/turmas", async (req, res) => {
      const response = await DatabaseTurmasMetodos.listarTurmas();
      res.status(200).json(response);
    });

    app.get("/turmas/:id", async (req, res) => {
      try {
        const turmas = await DatabaseTurmasMetodos.listarTurmasPorId(
          req.params.id
        );
        if (!turmas) {
          throw new Error("Turma não encontrada com esse Id");
        }
        res.status(200).json(response);
      } catch (error) {
        res.status(400).json(error.message);
      }
    });

    app.post("/turmas", async (req, res) => {
      const validaTurma = ValidacoesTurmas.validaTurmas(
        ...Object.values(req.body)
      );
      try {
        if (validaTurma) {
          const turma = new TurmasModel(...Object.values(req.body));
          const response = await DatabaseTurmasMetodos.inserirTurmas(turma);
          res.status(201).json(response);
        } else {
          throw new Error("Requisição incompleta, revise o corpo da mesma");
        }
      } catch (error) {
        res.status(400).json(error.message);
      }
    });

    app.put("/turmas/:id", (req, res) => {
      const validaTurma = ValidacoesTurmas.validaTurmas(
        ...Object.values(req.body)
      );
      if (validaTurma) {
        const turma = new TurmasModel(...Object.values(req.body));
        const response = DatabaseTurmasMetodos.atualizaTurmaPorId(
          req.params.id,
          turma
        );
        res.status(201).json(response);
      } else {
        res.status(400).json({ Erro: "Erro" });
      }
    });

    app.delete("/turmas/:id", async (req, res) => {
      const turma = await DatabaseTurmasMetodos.deletaTurmaPorId(req.params.id);
      try {
        if (!turma) {
          throw new Error("Turma não encontrada");
        }
        res.status(200).json(turma);
      } catch (error) {
        res.status(404).json({ Error: error.message });
      }
    });
  }
}

export default Turmas;
