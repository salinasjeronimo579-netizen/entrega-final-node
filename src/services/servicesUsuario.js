import {
  crearUsuario,
  obtenerUsuarios,
  eliminarUsuario,
  actualizarUsuario,
  obtenerUsuarioCorreo,
} from "../repositories/RepositoryUsuario.js";

export function registrarUsuario(data) {
  if (
    !data?.numero_documento ||
    !data.nombre ||
    !data.primer_apellido ||
    !data.telefono ||
    !data.email ||
    !data.direccion ||
    !data.fecha_registro
  ) {
    return Promise.reject(new Error("Campos incompletos..."));
  }
  return crearUsuario(data);
}

export function listarUsuarios() {
  return obtenerUsuarios();
}

export function modificarUsuario(data, id) {
  if (!id) {
    return Promise.reject(new Error("El ID es obligatorio..."));
  }
  return actualizarUsuario(data, id);
}

export function borrarUsuario(id) {
  if (!id) {
    return Promise.reject(new Error("El ID es obligatorio..."));
  }
  return eliminarUsuario(id);
}

export function buscarUsuarioPorCorreo(email) {
  if (!email) {
    return Promise.reject(new Error("El correo es obligatorio..."));
  }
  return obtenerUsuarioCorreo(email);
}
