import { ModelRol } from "../models/ModelRol.js";

export function crearRol(data) {
    return ModelRol.create(data)
}

export function obtenerRoles(data) {
    return ModelRol.findAll(data)
}

export function actualizarRol(data, id) {
    return ModelRol.update(data, { where: { id_rol: id } })
}

export function eliminarRol(id) {
    return ModelRol.destroy({ where: { id_rol: id } })
}