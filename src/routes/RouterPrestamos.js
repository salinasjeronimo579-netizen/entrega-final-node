import { Router } from "express";
import {
  listar,
  crear,
  editar,
  eliminar,
  devolver
} from "../controllers/ControllerPrestamo.js";

const router_prestamo = Router();

router_prestamo.get("/api/prestamos/", listar);
router_prestamo.post("/api/prestamos/", crear);
router_prestamo.delete("/api/prestamos/:id", eliminar);
router_prestamo.patch("/api/prestamos/:id", editar);
router_prestamo.patch("/api/prestamos/:id/devolver", devolver);

export { router_prestamo };