import { ModelLibroCategoria } from "../models/ModelLibroCategoria.js";

function validarRelacion(data) {
  return data?.id_libro && data?.id_categoria;
}

export function registrarLibroCategoria(data) {
  if (!validarRelacion(data))
    return Promise.reject(
      new Error("El libro y la categoría son obligatorios..."),
    );
  return ModelLibroCategoria.create(data);
}

export function listarLibrosCategorias() {
  return ModelLibroCategoria.findAll();
}

export function modificarLibroCategoria(data, id) {
  if (!id?.id_libro || !id.id_categoria)
    return Promise.reject(new Error("La relación es obligatoria..."));
  return ModelLibroCategoria.update(data, { where: id });
}

export function borrarLibroCategoria(id) {
  if (!id?.id_libro || !id.id_categoria)
    return Promise.reject(new Error("La relación es obligatoria..."));
  return ModelLibroCategoria.destroy({ where: id });
}
