import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEstadoPrestamo.js";

const router_estado_prestamo = Router();

router_estado_prestamo.get("/api/estados_prestamo/", listar);
router_estado_prestamo.post("/api/estados_prestamo/", crear);
router_estado_prestamo.delete("/api/estados_prestamo/:id", eliminar);
router_estado_prestamo.patch("/api/estados_prestamo/:id", editar);

export { router_estado_prestamo };