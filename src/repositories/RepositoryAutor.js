import { ModelAutor } from "../models/ModelAutor.js";

export function crearAutor(data) {
    return ModelAutor.create(data)
}

export function obtenerAutores(data) {
    return ModelAutor.findAll(data)
}

export function actualizarAutor(data, id) {
    return ModelAutor.update(data, { where: { id_autor: id } })
}

export function eliminarAutor(id) {
    return ModelAutor.destroy({ where: { id_autor: id } })
}