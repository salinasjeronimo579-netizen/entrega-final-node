import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerTipoNotificacion.js";

const router_tipo_notificacion = Router();

router_tipo_notificacion.get("/api/tipos_notificacion/", listar);
router_tipo_notificacion.post("/api/tipos_notificacion/", crear);
router_tipo_notificacion.delete("/api/tipos_notificacion/:id", eliminar);
router_tipo_notificacion.patch("/api/tipos_notificacion/:id", editar);

export { router_tipo_notificacion };