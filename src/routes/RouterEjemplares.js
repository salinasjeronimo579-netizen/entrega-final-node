import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEjemplar.js";

const router_ejemplar = Router();

router_ejemplar.get("/api/ejemplares/", listar);
router_ejemplar.post("/api/ejemplares/", crear);
router_ejemplar.delete("/api/ejemplares/:id", eliminar);
router_ejemplar.patch("/api/ejemplares/:id", editar);

export { router_ejemplar };