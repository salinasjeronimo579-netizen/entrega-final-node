import { ModelUsuario } from "../models/ModelUsuario.js";

export function crearUsuario(data) {
  return ModelUsuario.create(data);
}

export function obtenerUsuarios(options = {}) {
  return ModelUsuario.findAll(options);
}

export function actualizarUsuario(data, id) {
  return ModelUsuario.update(data, {
    where: { id_usuario: id }
  });
}

export function eliminarUsuario(id) {
  return ModelUsuario.destroy({
    where: { id_usuario: id }
  });
}

export function obtenerUsuarioCorreo(email) {
  return ModelUsuario.findOne({
    where: { email }
  });
}
