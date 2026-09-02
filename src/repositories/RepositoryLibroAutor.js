import { ModelLibroAutor } from "../models/ModelLibroAutor.js";

export function crearLibroAutor(data) {
    return ModelLibroAutor.create(data)
}

export function obtenerLibrosAutores(data) {
    return ModelLibroAutor.findAll(data)
}

export function eliminarLibroAutor(idLibro, idAutor) {
    return ModelLibroAutor.destroy({
        where: { id_libro: idLibro, id_autor: idAutor }
    })
}