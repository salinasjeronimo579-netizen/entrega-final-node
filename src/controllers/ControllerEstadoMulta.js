import ModelEstadoMulta from '../models/ModelEstadoMulta.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelEstadoMulta.findAll()
    .then((estados) => respuesta.status(200).json(estados))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los estados de multa', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoMulta.findByPk(id)
    .then((estado) => {
      if (!estado) return respuesta.status(404).json({ mensaje: 'Estado de multa no encontrado' });
      respuesta.status(200).json(estado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el estado de multa', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelEstadoMulta.create(peticion.body)
    .then((nuevoEstado) => respuesta.status(201).json(nuevoEstado))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el estado de multa', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoMulta.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Estado de multa no encontrado o sin cambios' });
      return ModelEstadoMulta.findByPk(id);
    })
    .then((estadoActualizado) => {
      if (estadoActualizado) respuesta.status(200).json(estadoActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el estado de multa', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEstadoMulta.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Estado de multa no encontrado' });
      respuesta.status(200).json({ mensaje: 'Estado de multa eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el estado de multa', error: error.message }));
};