import { ModelLibroCategoria } from "../models/ModelLibroCategoria.js";

export function crearLibroCategoria(data) {
    return ModelLibroCategoria.create(data)
}

export function obtenerLibrosCategorias(data) {
    return ModelLibroCategoria.findAll(data)
}

export function eliminarLibroCategoria(idLibro, idCategoria) {
    return ModelLibroCategoria.destroy({
        where: { id_libro: idLibro, id_categoria: idCategoria }
    })
}