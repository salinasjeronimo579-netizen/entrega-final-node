import { ModelTipoDocumento } from "../models/ModelTipoDocumento.js";

export function crearTipoDocumento(data) {
    return ModelTipoDocumento.create(data)
}

export function obtenerTiposDocumento(data) {
    return ModelTipoDocumento.findAll(data)
}

export function actualizarTipoDocumento(data, id) {
    return ModelTipoDocumento.update(data, { where: { id_tipo_documento: id } })
}

export function eliminarTipoDocumento(id) {
    return ModelTipoDocumento.destroy({ where: { id_tipo_documento: id } })
}