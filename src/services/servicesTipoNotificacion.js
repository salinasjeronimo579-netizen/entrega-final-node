import { ModelTipoNotificacion } from "../models/ModelTipoNotificacion.js";

export function registrarTipoNotificacion(data) {
  if (!data?.nombre)
    return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelTipoNotificacion.create(data);
}

export function listarTiposNotificacion() {
  return ModelTipoNotificacion.findAll();
}

export function modificarTipoNotificacion(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelTipoNotificacion.update(data, {
    where: { id_tipo_notificacion: id },
  });
}

export function borrarTipoNotificacion(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelTipoNotificacion.destroy({ where: { id_tipo_notificacion: id } });
}

export function consultarTipoNotificacionNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelTipoNotificacion.findOne({ where: { nombre } });
}
