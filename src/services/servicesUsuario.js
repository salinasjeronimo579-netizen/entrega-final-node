import {
  crearUsuario,
  obterUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  obtenerUsuarioCorreo
} from "../repositories/RepositoryUsuario.js";

export function registrarUsuario(data) {
  return crearUsuario(data);
}

export function listarUsuarios() {
  return obterUsuarios();
}

export function modificarUsuario(data, id) {
  return actualizarUsuario(data, id);
}

export function borrarUsuario(id) {
  return eliminarUsuario(id);
}

export function buscarUsuarioPorCorreo(email) {
  return obtenerUsuarioCorreo(email);
}