import ModelPrestamo from '../models/ModelPrestamo.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelPrestamo.findAll()
    .then((prestamos) => respuesta.status(200).json(prestamos))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los préstamos', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPrestamo.findByPk(id)
    .then((prestamo) => {
      if (!prestamo) return respuesta.status(404).json({ mensaje: 'Préstamo no encontrado' });
      respuesta.status(200).json(prestamo);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el préstamo', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelPrestamo.create(peticion.body)
    .then((nuevoPrestamo) => respuesta.status(201).json(nuevoPrestamo))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el préstamo', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPrestamo.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Préstamo no encontrado o sin cambios' });
      return ModelPrestamo.findByPk(id);
    })
    .then((prestamoActualizado) => {
      if (prestamoActualizado) respuesta.status(200).json(prestamoActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el préstamo', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPrestamo.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Préstamo no encontrado' });
      respuesta.status(200).json({ mensaje: 'Préstamo eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el préstamo', error: error.message }));
};