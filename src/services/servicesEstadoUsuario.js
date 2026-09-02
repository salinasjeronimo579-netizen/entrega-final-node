import { ModelEstadoUsuario } from "../models/ModelEstadoUsuario.js";

export function registrarEstadoUsuario(data) {
  if (!data?.nombre_estado_usuario)
    return Promise.reject(new Error("El nombre del estado es obligatorio..."));
  return ModelEstadoUsuario.create(data);
}

export function listarEstadosUsuario() {
  return ModelEstadoUsuario.findAll();
}

export function modificarEstadoUsuario(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoUsuario.update(data, { where: { id_estado_usuario: id } });
}

export function borrarEstadoUsuario(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoUsuario.destroy({ where: { id_estado_usuario: id } });
}

export function consultarEstadoUsuarioNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEstadoUsuario.findOne({
    where: { nombre_estado_usuario: nombre },
  });
}
