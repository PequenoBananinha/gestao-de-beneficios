import "./lib/zod";
import express from "express";
import { funcionariosRouter } from "./routes/funcionarios.routes";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Todas as rotas de funcionários ficam agrupadas sob o prefixo "/funcionarios"
app.use("/funcionarios", funcionariosRouter);
app.use(notFoundHandler);
app.use(errorHandler);


export { app };
