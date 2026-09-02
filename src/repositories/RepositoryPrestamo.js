import { ModelPrestamo } from "../models/ModelPrestamo.js";

export function crearPrestamo(data) {
    return ModelPrestamo.create(data)
}

export function obtenerPrestamos(data) {
    return ModelPrestamo.findAll(data)
}

export function actualizarPrestamo(data, id) {
    return ModelPrestamo.update(data, { where: { id_prestamo: id } })
}

export function eliminarPrestamo(id) {
    return ModelPrestamo.destroy({ where: { id_prestamo: id } })
}