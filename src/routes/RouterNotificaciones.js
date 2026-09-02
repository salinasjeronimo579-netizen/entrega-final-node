import { Router } from "express";
import {
  listar,
  crear,
  editar,
  eliminar,
  marcarLeida
} from "../controllers/ControllerNotificacion.js";

const router_notificacion = Router();

router_notificacion.get("/api/notificaciones/", listar);
router_notificacion.post("/api/notificaciones/", crear);
router_notificacion.delete("/api/notificaciones/:id", eliminar);
router_notificacion.patch("/api/notificaciones/:id", editar);
router_notificacion.patch("/api/notificaciones/:id/marcar-leida", marcarLeida);

export { router_notificacion };