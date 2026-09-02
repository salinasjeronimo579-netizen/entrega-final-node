import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerCategoria.js";

const router_categoria = Router();

router_categoria.get("/api/categorias/", listar);
router_categoria.post("/api/categorias/", crear);
router_categoria.delete("/api/categorias/:id", eliminar);
router_categoria.patch("/api/categorias/:id", editar);

export { router_categoria };