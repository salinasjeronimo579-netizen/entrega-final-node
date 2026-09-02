/* SELECT * FROM USUARIOS */
/* Métodos de la ORM:
 - findAll: Conuslta Todo lo de una tabla
 - findOne: Consulta un elemento por un campo
 - create: Crea un registro
 - destroy: Elimina un registro
 - update: Actualiza un registro
*/

/* M -> R -> S -> C */
/* C -> S -> R -> M; */
import { ModelUsuario } from "../models/ModelUsuario.js";

export function crearUsuario(data) {
    return ModelUsuario.create(data)
}

export function obtenerUsuarios(data) {
    return ModelUsuario.findAll(data)
}

export function actualizarUsuario(data, id) {
    return ModelUsuario.update(data, {
        where: { id_usuario: id }
    })
}

export function eliminarUsuario(id) {
    return ModelUsuario.destroy({
        where: { id_usuario: id }
    })
}

export function obtenerUsuarioCorreo(correo) {
    return ModelUsuario.findOne({
        where: { correo: correo }
    })
}