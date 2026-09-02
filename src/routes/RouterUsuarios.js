import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerUsuario.js";

const router_usuario = Router();

router_usuario.get("/api/usuarios/", listar);
router_usuario.post("/api/usuarios/", crear);
router_usuario.delete("/api/usuarios/:id", eliminar);
router_usuario.patch("/api/usuarios/:id", editar);

export { router_usuario };