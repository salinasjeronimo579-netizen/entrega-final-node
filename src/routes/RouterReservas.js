import { Router } from "express";
import {
  listar,
  crear,
  editar,
  eliminar,
  cancelar
} from "../controllers/ControllerReserva.js";

const router_reserva = Router();

router_reserva.get("/api/reservas/", listar);
router_reserva.post("/api/reservas/", crear);
router_reserva.delete("/api/reservas/:id", eliminar);
router_reserva.patch("/api/reservas/:id", editar);
router_reserva.patch("/api/reservas/:id/cancelar", cancelar);

export { router_reserva };