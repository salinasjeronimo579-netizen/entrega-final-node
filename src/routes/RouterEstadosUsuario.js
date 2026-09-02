import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEstadoUsuario.js";

const router_estado_usuario = Router();

router_estado_usuario.get("/api/estados_usuario/", listar);
router_estado_usuario.post("/api/estados_usuario/", crear);
router_estado_usuario.delete("/api/estados_usuario/:id", eliminar);
router_estado_usuario.patch("/api/estados_usuario/:id", editar);

export { router_estado_usuario };