import { ModelMulta } from "../models/ModelMulta.js";

export function registrarMulta(data) {
  if (
    !data?.id_prestamo ||
    !data.id_estado_multa ||
    data.monto === undefined ||
    !data.motivo ||
    !data.fecha_generada
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelMulta.create(data);
}

export function listarMultas() {
  return ModelMulta.findAll();
}

export function modificarMulta(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelMulta.update(data, { where: { id_multa: id } });
}

export function borrarMulta(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelMulta.destroy({ where: { id_multa: id } });
}

export function consultarMulta(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelMulta.findByPk(id);
}
