import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEstadoEjemplar.js";

const router_estado_ejemplar = Router();

router_estado_ejemplar.get("/api/estados_ejemplar/", listar);
router_estado_ejemplar.post("/api/estados_ejemplar/", crear);
router_estado_ejemplar.delete("/api/estados_ejemplar/:id", eliminar);
router_estado_ejemplar.patch("/api/estados_ejemplar/:id", editar);

export { router_estado_ejemplar };