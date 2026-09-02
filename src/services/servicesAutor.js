import { ModelAutor } from "../models/ModelAutor.js";

export function registrarAutor(data) {
  if (
    !data?.nombre ||
    !data.apellido ||
    !data.nacionalidad ||
    !data.fecha_nacimiento
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelAutor.create(data);
}

export function listarAutores() {
  return ModelAutor.findAll();
}

export function modificarAutor(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelAutor.update(data, { where: { id_autor: id } });
}

export function borrarAutor(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelAutor.destroy({ where: { id_autor: id } });
}

export function consultarAutorNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelAutor.findOne({ where: { nombre } });
}
