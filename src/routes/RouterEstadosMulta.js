import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEstadoMulta.js";

const router_estado_multa = Router();

router_estado_multa.get("/api/estados_multa/", listar);
router_estado_multa.post("/api/estados_multa/", crear);
router_estado_multa.delete("/api/estados_multa/:id", eliminar);
router_estado_multa.patch("/api/estados_multa/:id", editar);

export { router_estado_multa };