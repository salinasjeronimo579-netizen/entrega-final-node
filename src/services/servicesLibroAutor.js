import { ModelLibroAutor } from "../models/ModelLibroAutor.js";

function validarRelacion(data) {
  return data?.id_libro && data?.id_autor;
}

export function registrarLibroAutor(data) {
  if (!validarRelacion(data))
    return Promise.reject(new Error("El libro y el autor son obligatorios..."));
  return ModelLibroAutor.create(data);
}

export function listarLibrosAutores() {
  return ModelLibroAutor.findAll();
}

export function modificarLibroAutor(data, id) {
  if (!id?.id_libro || !id.id_autor)
    return Promise.reject(new Error("La relación es obligatoria..."));
  return ModelLibroAutor.update(data, { where: id });
}

export function borrarLibroAutor(id) {
  if (!id?.id_libro || !id.id_autor)
    return Promise.reject(new Error("La relación es obligatoria..."));
  return ModelLibroAutor.destroy({ where: id });
}
