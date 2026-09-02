import { ModelEstadoPrestamo } from "../models/ModelEstadoPrestamo.js";

export function crearEstadoPrestamo(data) {
    return ModelEstadoPrestamo.create(data)
}

export function obtenerEstadosPrestamo(data) {
    return ModelEstadoPrestamo.findAll(data)
}

export function actualizarEstadoPrestamo(data, id) {
    return ModelEstadoPrestamo.update(data, { where: { id_estado_prestamo: id } })
}

export function eliminarEstadoPrestamo(id) {
    return ModelEstadoPrestamo.destroy({ where: { id_estado_prestamo: id } })
}