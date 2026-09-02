import { ModelPais } from "../models/ModelPais.js";

export function crearPais(data) {
    return ModelPais.create(data)
}

export function obtenerPaises(data) {
    return ModelPais.findAll(data)
}

export function actualizarPais(data, id) {
    return ModelPais.update(data, { where: { id_pais: id } })
}

export function eliminarPais(id) {
    return ModelPais.destroy({ where: { id_pais: id } })
}