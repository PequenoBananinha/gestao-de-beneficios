import express from "express";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(3333, () => {
  console.log("Servidor rodando em http://localhost:3333");
});