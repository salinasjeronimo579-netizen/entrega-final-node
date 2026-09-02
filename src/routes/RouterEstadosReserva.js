import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEstadoReserva.js";

const router_estado_reserva = Router();

router_estado_reserva.get("/api/estados_reserva/", listar);
router_estado_reserva.post("/api/estados_reserva/", crear);
router_estado_reserva.delete("/api/estados_reserva/:id", eliminar);
router_estado_reserva.patch("/api/estados_reserva/:id", editar);

export { router_estado_reserva };