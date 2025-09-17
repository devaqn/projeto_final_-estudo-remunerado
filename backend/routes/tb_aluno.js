const express = require("express");
const router = express.Router();
const connection = require("../connectDb");

router.get("/", async (req, res) => {
  const [rows] = await connection.query("SELECT * FROM tb_aluno");
  res.json(rows);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await connection.query("SELECT * FROM tb_aluno WHERE id = ?", [id]);
  res.json(rows[0]);
});

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;
  const [result] = await connection.query(
    "INSERT INTO tb_aluno (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha]
  );
  res.status(201).json({ id: result.insertId, ...req.body });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  await connection.query(
    "UPDATE tb_aluno SET nome=?, email=?, senha=? WHERE id=?",
    [nome, email, senha, id]
  );
  res.json({ id, ...req.body });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await connection.query("DELETE FROM tb_aluno WHERE id=?", [id]);
  res.json({ message: "Aluno deletado com sucesso" });
});

module.exports = router;
