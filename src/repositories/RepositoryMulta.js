import { ModelMulta } from "../models/ModelMulta.js";

export function crearMulta(data) {
    return ModelMulta.create(data)
}

export function obtenerMultas(data) {
    return ModelMulta.findAll(data)
}

export function actualizarMulta(data, id) {
    return ModelMulta.update(data, { where: { id_multa: id } })
}

export function eliminarMulta(id) {
    return ModelMulta.destroy({ where: { id_multa: id } })
}