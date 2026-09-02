import { Router } from "express";
import {
  listar,
  crear,
  editar,
  eliminar,
  agregarAutor,
  agregarCategoria
} from "../controllers/ControllerLibro.js";

const router_libro = Router();

router_libro.get("/api/libros/", listar);
router_libro.post("/api/libros/", crear);
router_libro.delete("/api/libros/:id", eliminar);
router_libro.patch("/api/libros/:id", editar);
router_libro.post("/api/libros/:id/autores", agregarAutor);
router_libro.post("/api/libros/:id/categorias", agregarCategoria);

export { router_libro };