import ModelUsuario from '../models/ModelUsuario.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelUsuario.findAll()
    .then((usuarios) => respuesta.status(200).json(usuarios))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelUsuario.findByPk(id)
    .then((usuario) => {
      if (!usuario) return respuesta.status(404).json({ mensaje: 'Usuario no encontrado' });
      respuesta.status(200).json(usuario);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el usuario', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelUsuario.create(peticion.body)
    .then((nuevoUsuario) => respuesta.status(201).json(nuevoUsuario))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el usuario', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelUsuario.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Usuario no encontrado o sin cambios' });
      return ModelUsuario.findByPk(id);
    })
    .then((usuarioActualizado) => {
      if (usuarioActualizado) respuesta.status(200).json(usuarioActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelUsuario.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Usuario no encontrado' });
      respuesta.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message }));
};