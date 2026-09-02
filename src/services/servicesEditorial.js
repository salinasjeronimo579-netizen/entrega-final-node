import { ModelEditorial } from "../models/ModelEditorial.js";

export function registrarEditorial(data) {
  if (!data?.nombre_editorial || !data.email)
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelEditorial.create(data);
}

export function listarEditoriales() {
  return ModelEditorial.findAll();
}

export function modificarEditorial(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEditorial.update(data, { where: { id_editorial: id } });
}

export function borrarEditorial(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEditorial.destroy({ where: { id_editorial: id } });
}

export function consultarEditorialNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEditorial.findOne({ where: { nombre_editorial: nombre } });
}
