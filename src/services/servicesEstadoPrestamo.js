import { ModelEstadoPrestamo } from "../models/ModelEstadoPrestamo.js";

export function registrarEstadoPrestamo(data) {
  if (!data?.nombre_estado)
    return Promise.reject(new Error("El nombre del estado es obligatorio..."));
  return ModelEstadoPrestamo.create(data);
}

export function listarEstadosPrestamo() {
  return ModelEstadoPrestamo.findAll();
}

export function modificarEstadoPrestamo(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoPrestamo.update(data, {
    where: { id_estado_prestamo: id },
  });
}

export function borrarEstadoPrestamo(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoPrestamo.destroy({ where: { id_estado_prestamo: id } });
}

export function consultarEstadoPrestamoNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEstadoPrestamo.findOne({ where: { nombre_estado: nombre } });
}
