import { ModelEditorial } from "../models/ModelEditorial.js";

export function crearEditorial(data) {
    return ModelEditorial.create(data)
}

export function obtenerEditoriales(data) {
    return ModelEditorial.findAll(data)
}

export function actualizarEditorial(data, id) {
    return ModelEditorial.update(data, { where: { id_editorial: id } })
}

export function eliminarEditorial(id) {
    return ModelEditorial.destroy({ where: { id_editorial: id } })
}