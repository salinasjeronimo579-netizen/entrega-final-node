import ModelTipoNotificacion from '../models/ModelTipoNotificacion.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelTipoNotificacion.findAll()
    .then((tipos) => respuesta.status(200).json(tipos))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los tipos de notificación', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoNotificacion.findByPk(id)
    .then((tipo) => {
      if (!tipo) return respuesta.status(404).json({ mensaje: 'Tipo de notificación no encontrado' });
      respuesta.status(200).json(tipo);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el tipo de notificación', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelTipoNotificacion.create(peticion.body)
    .then((nuevoTipo) => respuesta.status(201).json(nuevoTipo))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el tipo de notificación', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoNotificacion.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Tipo de notificación no encontrado o sin cambios' });
      return ModelTipoNotificacion.findByPk(id);
    })
    .then((tipoActualizado) => {
      if (tipoActualizado) respuesta.status(200).json(tipoActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el tipo de notificación', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoNotificacion.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Tipo de notificación no encontrado' });
      respuesta.status(200).json({ mensaje: 'Tipo de notificación eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el tipo de notificación', error: error.message }));
};