import { ModelEstadoReserva } from "../models/ModelEstadoReserva.js";

export function registrarEstadoReserva(data) {
  if (!data?.nombre_estado)
    return Promise.reject(new Error("El nombre del estado es obligatorio..."));
  return ModelEstadoReserva.create(data);
}

export function listarEstadosReserva() {
  return ModelEstadoReserva.findAll();
}

export function modificarEstadoReserva(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoReserva.update(data, { where: { id_estado_reserva: id } });
}

export function borrarEstadoReserva(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEstadoReserva.destroy({ where: { id_estado_reserva: id } });
}

export function consultarEstadoReservaNombre(nombre) {
  if (!nombre) return Promise.reject(new Error("El nombre es obligatorio..."));
  return ModelEstadoReserva.findOne({ where: { nombre_estado: nombre } });
}
