import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerRol.js";

const router_rol = Router();

router_rol.get("/api/roles/", listar);
router_rol.post("/api/roles/", crear);
router_rol.delete("/api/roles/:id", eliminar);
router_rol.patch("/api/roles/:id", editar);

export { router_rol };