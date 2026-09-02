import { ModelEstadoReserva } from "../models/ModelEstadoReserva.js";

export function crearEstadoReserva(data) {
    return ModelEstadoReserva.create(data)
}

export function obtenerEstadosReserva(data) {
    return ModelEstadoReserva.findAll(data)
}

export function actualizarEstadoReserva(data, id) {
    return ModelEstadoReserva.update(data, { where: { id_estado_reserva: id } })
}

export function eliminarEstadoReserva(id) {
    return ModelEstadoReserva.destroy({ where: { id_estado_reserva: id } })
}