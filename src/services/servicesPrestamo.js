import { ModelPrestamo } from "../models/ModelPrestamo.js";

export function registrarPrestamo(data) {
  if (
    !data?.id_ejemplar ||
    !data.id_cliente ||
    !data.id_registrado_por ||
    !data.id_estado_prestamo ||
    !data.fecha_prestamo ||
    !data.fecha_devolucion_esperada
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelPrestamo.create(data);
}

export function listarPrestamos() {
  return ModelPrestamo.findAll();
}

export function modificarPrestamo(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelPrestamo.update(data, { where: { id_prestamo: id } });
}

export function borrarPrestamo(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelPrestamo.destroy({ where: { id_prestamo: id } });
}

export function consultarPrestamo(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelPrestamo.findByPk(id);
}
