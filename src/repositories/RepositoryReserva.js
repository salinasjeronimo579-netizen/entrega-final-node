import { ModelReserva } from "../models/ModelReserva.js";

export function crearReserva(data) {
    return ModelReserva.create(data)
}

export function obtenerReservas(data) {
    return ModelReserva.findAll(data)
}

export function actualizarReserva(data, id) {
    return ModelReserva.update(data, { where: { id_reserva: id } })
}

export function eliminarReserva(id) {
    return ModelReserva.destroy({ where: { id_reserva: id } })
}