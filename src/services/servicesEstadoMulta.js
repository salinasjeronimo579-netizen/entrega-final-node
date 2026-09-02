import { ModelEstadoMulta } from "../models/ModelEstadoMulta.js";

export function registrarEstadoMulta(data) {
  if (!data?.nombre_estado)
    return Promise.reject(new Error("El nombre del estado es obligatorio..."));
  return ModelEstadoMulta.create(data);
}

export function listarEstadosMulta() {
  return ModelEstadoMulta.findAll();
}

export function modificarEstadoMulta(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoMulta.update(data, { where: { id_estado_multa: id } });
}

export function borrarEstadoMulta(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoMulta.destroy({ where: { id_estado_multa: id } });
}

export function consultarEstadoMultaNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEstadoMulta.findOne({ where: { nombre_estado: nombre } });
}
