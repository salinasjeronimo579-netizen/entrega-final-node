import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerIdioma.js";

const router_idioma = Router();

router_idioma.get("/api/idiomas/", listar);
router_idioma.post("/api/idiomas/", crear);
router_idioma.delete("/api/idiomas/:id", eliminar);
router_idioma.patch("/api/idiomas/:id", editar);

export { router_idioma };