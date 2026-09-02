import { ModelCategoria } from "../models/ModelCategoria.js";

export function registrarCategoria(data) {
  if (!data?.nombre)
    return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelCategoria.create(data);
}

export function listarCategorias() {
  return ModelCategoria.findAll();
}

export function modificarCategoria(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelCategoria.update(data, { where: { id_categoria: id } });
}

export function borrarCategoria(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelCategoria.destroy({ where: { id_categoria: id } });
}

export function consultarCategoriaNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelCategoria.findOne({ where: { nombre } });
}
