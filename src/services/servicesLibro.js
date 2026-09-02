import { ModelLibro } from "../models/ModelLibro.js";

export function registrarLibro(data) {
  if (
    !data?.titulo ||
    !data.isbn ||
    !data.anio_publicacion ||
    !data.num_paginas
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelLibro.create(data);
}

export function listarLibros() {
  return ModelLibro.findAll();
}

export function modificarLibro(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelLibro.update(data, { where: { id_libro: id } });
}

export function borrarLibro(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelLibro.destroy({ where: { id_libro: id } });
}

export function consultarLibroTitulo(titulo) {
  if (!titulo) return Promise.reject(new Error("El título es obligatorio..."));
  return ModelLibro.findOne({ where: { titulo } });
}
