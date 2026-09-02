import { ModelEstadoEjemplar } from "../models/ModelEstadoEjemplar.js";

export function registrarEstadoEjemplar(data) {
  if (!data?.nombre_estado)
    return Promise.reject(new Error("El nombre del estado es obligatorio..."));
  return ModelEstadoEjemplar.create(data);
}

export function listarEstadosEjemplar() {
  return ModelEstadoEjemplar.findAll();
}

export function modificarEstadoEjemplar(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoEjemplar.update(data, {
    where: { id_estado_ejemplar: id },
  });
}

export function borrarEstadoEjemplar(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoEjemplar.destroy({ where: { id_estado_ejemplar: id } });
}

export function consultarEstadoEjemplarNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEstadoEjemplar.findOne({ where: { nombre_estado: nombre } });
}
