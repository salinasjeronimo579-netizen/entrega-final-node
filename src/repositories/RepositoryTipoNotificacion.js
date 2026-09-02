import { ModelTipoNotificacion } from "../models/ModelTipoNotificacion.js";

export function crearTipoNotificacion(data) {
    return ModelTipoNotificacion.create(data)
}

export function obtenerTiposNotificacion(data) {
    return ModelTipoNotificacion.findAll(data)
}

export function actualizarTipoNotificacion(data, id) {
    return ModelTipoNotificacion.update(data, { where: { id_tipo_notificacion: id } })
}

export function eliminarTipoNotificacion(id) {
    return ModelTipoNotificacion.destroy({ where: { id_tipo_notificacion: id } })
}