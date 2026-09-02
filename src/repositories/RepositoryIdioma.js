import { ModelIdioma } from "../models/ModelIdioma.js";

export function crearIdioma(data) {
    return ModelIdioma.create(data)
}

export function obtenerIdiomas(data) {
    return ModelIdioma.findAll(data)
}

export function actualizarIdioma(data, id) {
    return ModelIdioma.update(data, { where: { id_idioma: id } })
}

export function eliminarIdioma(id) {
    return ModelIdioma.destroy({ where: { id_idioma: id } })
}