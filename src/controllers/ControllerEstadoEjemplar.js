import ModelEstadoEjemplar from '../models/ModelEstadoEjemplar.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelEstadoEjemplar.findAll()
    .then((estados) => respuesta.status(200).json(estados))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los estados de ejemplar', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoEjemplar.findByPk(id)
    .then((estado) => {
      if (!estado) return respuesta.status(404).json({ mensaje: 'Estado de ejemplar no encontrado' });
      respuesta.status(200).json(estado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el estado de ejemplar', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelEstadoEjemplar.create(peticion.body)
    .then((nuevoEstado) => respuesta.status(201).json(nuevoEstado))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el estado de ejemplar', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoEjemplar.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Estado de ejemplar no encontrado o sin cambios' });
      return ModelEstadoEjemplar.findByPk(id);
    })
    .then((estadoActualizado) => {
      if (estadoActualizado) respuesta.status(200).json(estadoActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el estado de ejemplar', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoEjemplar.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Estado de ejemplar no encontrado' });
      respuesta.status(200).json({ mensaje: 'Estado de ejemplar eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el estado de ejemplar', error: error.message }));
};