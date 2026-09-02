import { ModelIdioma } from "../models/ModelIdioma.js";

export function registrarIdioma(data) {
  if (!data?.nombre)
    return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelIdioma.create(data);
}

export function listarIdiomas() {
  return ModelIdioma.findAll();
}

export function modificarIdioma(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelIdioma.update(data, { where: { id_idioma: id } });
}

export function borrarIdioma(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelIdioma.destroy({ where: { id_idioma: id } });
}

export function consultarIdiomaNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelIdioma.findOne({ where: { nombre } });
}
