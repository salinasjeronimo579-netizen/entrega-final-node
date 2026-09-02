import { ModelEjemplar } from "../models/ModelEjemplar.js";

export function crearEjemplar(data) {
    return ModelEjemplar.create(data)
}

export function obtenerEjemplares(data) {
    return ModelEjemplar.findAll(data)
}

export function actualizarEjemplar(data, id) {
    return ModelEjemplar.update(data, { where: { id_ejemplar: id } })
}

export function eliminarEjemplar(id) {
    return ModelEjemplar.destroy({ where: { id_ejemplar: id } })
}