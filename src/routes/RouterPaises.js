import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerPais.js";

const router_pais = Router();

router_pais.get("/api/paises/", listar);
router_pais.post("/api/paises/", crear);
router_pais.delete("/api/paises/:id", eliminar);
router_pais.patch("/api/paises/:id", editar);

export { router_pais };