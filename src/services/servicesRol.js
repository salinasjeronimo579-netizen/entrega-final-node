import { ModelRol } from "../models/ModelRol.js";

export function registrarRol(data) {
  if (!data?.nombre_rol || !data.descripcion_rol)
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelRol.create(data);
}

export function listarRoles() {
  return ModelRol.findAll();
}

export function modificarRol(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelRol.update(data, { where: { id_rol: id } });
}

export function borrarRol(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelRol.destroy({ where: { id_rol: id } });
}

export function consultarRolNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelRol.findOne({ where: { nombre_rol: nombre } });
}
