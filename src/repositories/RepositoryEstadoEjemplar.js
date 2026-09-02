import { ModelEstadoEjemplar } from "../models/ModelEstadoEjemplar.js";

export function crearEstadoEjemplar(data) {
    return ModelEstadoEjemplar.create(data)
}

export function obtenerEstadosEjemplar(data) {
    return ModelEstadoEjemplar.findAll(data)
}

export function actualizarEstadoEjemplar(data, id) {
    return ModelEstadoEjemplar.update(data, { where: { id_estado_ejemplar: id } })
}

export function eliminarEstadoEjemplar(id) {
    return ModelEstadoEjemplar.destroy({ where: { id_estado_ejemplar: id } })
}