import ModelReserva from '../models/ModelReserva.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelReserva.findAll()
    .then((reservas) => respuesta.status(200).json(reservas))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener las reservas', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelReserva.findByPk(id)
    .then((reserva) => {
      if (!reserva) return respuesta.status(404).json({ mensaje: 'Reserva no encontrada' });
      respuesta.status(200).json(reserva);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar la reserva', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelReserva.create(peticion.body)
    .then((nuevaReserva) => respuesta.status(201).json(nuevaReserva))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear la reserva', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelReserva.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Reserva no encontrada o sin cambios' });
      return ModelReserva.findByPk(id);
    })
    .then((reservaActualizada) => {
      if (reservaActualizada) respuesta.status(200).json(reservaActualizada);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar la reserva', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelReserva.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Reserva no encontrada' });
      respuesta.status(200).json({ mensaje: 'Reserva eliminada correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar la reserva', error: error.message }));
};