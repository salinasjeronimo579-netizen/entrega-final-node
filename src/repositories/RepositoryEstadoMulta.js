import { ModelEstadoMulta } from "../models/ModelEstadoMulta.js";

export function crearEstadoMulta(data) {
    return ModelEstadoMulta.create(data)
}

export function obtenerEstadosMulta(data) {
    return ModelEstadoMulta.findAll(data)
}

export function actualizarEstadoMulta(data, id) {
    return ModelEstadoMulta.update(data, { where: { id_estado_multa: id } })
}

export function eliminarEstadoMulta(id) {
    return ModelEstadoMulta.destroy({ where: { id_estado_multa: id } })
}