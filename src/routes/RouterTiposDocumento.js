import { Router } from "express";
import { listar, crear, editar, eliminar } from "../controllers/ControllerTipoDocumento.js";

const router_tipo_documento = Router();

router_tipo_documento.get("/api/tipos_documento/", listar);
router_tipo_documento.post("/api/tipos_documento/", crear);
router_tipo_documento.delete("/api/tipos_documento/:id", eliminar);
router_tipo_documento.patch("/api/tipos_documento/:id", editar);

export { router_tipo_documento };