import { ModelPais } from "../models/ModelPais.js";

export function registrarPais(data) {
  if (!data?.nombre_pais)
    return Promise.reject(new Error("El nombre del país es obligatorio..."));
  return ModelPais.create(data);
}

export function listarPaises() {
  return ModelPais.findAll();
}

export function modificarPais(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelPais.update(data, { where: { id_pais: id } });
}

export function borrarPais(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelPais.destroy({ where: { id_pais: id } });
}

export function consultarPaisNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelPais.findOne({ where: { nombre_pais: nombre } });
}
