import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerEditorial.js";

const router_editorial = Router();

router_editorial.get("/api/editoriales/", listar);
router_editorial.post("/api/editoriales/", crear);
router_editorial.delete("/api/editoriales/:id", eliminar);
router_editorial.patch("/api/editoriales/:id", editar);

export { router_editorial };