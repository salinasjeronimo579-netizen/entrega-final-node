import { ModelEjemplar } from "../models/ModelEjemplar.js";

export function registrarEjemplar(data) {
  if (
    !data?.codigo_inventario ||
    !data.ubicacion_estante ||
    !data.fecha_adquisicion ||
    !data.codigo_barras
  )
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelEjemplar.create(data);
}

export function listarEjemplares() {
  return ModelEjemplar.findAll();
}

export function modificarEjemplar(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEjemplar.update(data, { where: { id_ejemplar: id } });
}

export function borrarEjemplar(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelEjemplar.destroy({ where: { id_ejemplar: id } });
}

export function consultarEjemplarCodigo(codigo) {
  if (!codigo) return Promise.reject(new Error("El código es obligatorio..."));
  return ModelEjemplar.findOne({ where: { codigo_inventario: codigo } });
}
