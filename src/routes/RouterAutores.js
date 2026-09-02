import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerAutor.js";

const router_autor = Router();

router_autor.get("/api/autores/", listar);
router_autor.post("/api/autores/", crear);
router_autor.delete("/api/autores/:id", eliminar);
router_autor.patch("/api/autores/:id", editar);

export { router_autor };