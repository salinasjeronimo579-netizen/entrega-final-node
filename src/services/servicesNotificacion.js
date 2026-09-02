import { ModelNotificacion } from "../models/ModelNotificacion.js";

export function registrarNotificacion(data) {
  if (
    !data?.id_cliente ||
    !data.id_tipo_notificacion ||
    !data.mensaje ||
    !data.fecha_envio
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelNotificacion.create(data);
}

export function listarNotificaciones() {
  return ModelNotificacion.findAll();
}

export function modificarNotificacion(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelNotificacion.update(data, { where: { id_notificacion: id } });
}

export function borrarNotificacion(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelNotificacion.destroy({ where: { id_notificacion: id } });
}

export function consultarNotificacion(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelNotificacion.findByPk(id);
}
