import { ModelNotificacion } from "../models/ModelNotificacion.js";

export function crearNotificacion(data) {
    return ModelNotificacion.create(data)
}

export function obtenerNotificaciones(data) {
    return ModelNotificacion.findAll(data)
}

export function actualizarNotificacion(data, id) {
    return ModelNotificacion.update(data, { where: { id_notificacion: id } })
}

export function eliminarNotificacion(id) {
    return ModelNotificacion.destroy({ where: { id_notificacion: id } })
}