import { ModelTipoDocumento } from "../models/ModelTipoDocumento.js";

export function registrarTipoDocumento(data) {
  if (!data?.codigo || !data.nombre)
    return Promise.reject(new Error("Campos incompletos..."));
  return ModelTipoDocumento.create(data);
}

export function listarTiposDocumento() {
  return ModelTipoDocumento.findAll();
}

export function modificarTipoDocumento(data, id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelTipoDocumento.update(data, { where: { id_tipo_documento: id } });
}

export function borrarTipoDocumento(id) {
  if (!id) return Promise.reject(new Error("El ID es obligatorio..."));
  return ModelTipoDocumento.destroy({ where: { id_tipo_documento: id } });
}

export function consultarTipoDocumentoCodigo(codigo) {
  if (!codigo) return Promise.reject(new Error("El código es obligatorio..."));
  return ModelTipoDocumento.findOne({ where: { codigo } });
}
