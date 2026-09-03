import ModelNotificacion from '../models/ModelNotificacion.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelNotificacion.findAll()
    .then((notificaciones) => respuesta.status(200).json(notificaciones))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener las notificaciones', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelNotificacion.findByPk(id)
    .then((notificacion) => {
      if (!notificacion) return respuesta.status(404).json({ mensaje: 'Notificación no encontrada' });
      respuesta.status(200).json(notificacion);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar la notificación', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelNotificacion.create(peticion.body)
    .then((nuevaNotificacion) => respuesta.status(201).json(nuevaNotificacion))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear la notificación', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelNotificacion.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Notificación no encontrada o sin cambios' });
      return ModelNotificacion.findByPk(id);
    })
    .then((notificacionActualizada) => {
      if (notificacionActualizada) respuesta.status(200).json(notificacionActualizada);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar la notificación', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelNotificacion.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Notificación no encontrada' });
      respuesta.status(200).json({ mensaje: 'Notificación eliminada correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar la notificación', error: error.message }));
};