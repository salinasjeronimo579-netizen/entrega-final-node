import { Router } from "express";
import {
  listar,
  crear,
  editar,
  eliminar,
  pagar
} from "../controllers/ControllerMulta.js";

const router_multa = Router();

router_multa.get("/api/multas/", listar);
router_multa.post("/api/multas/", crear);
router_multa.delete("/api/multas/:id", eliminar);
router_multa.patch("/api/multas/:id", editar);
router_multa.patch("/api/multas/:id/pagar", pagar);

export { router_multa };