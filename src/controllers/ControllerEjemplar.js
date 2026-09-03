import ModelEjemplar from '../models/ModelEjemplar.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelEjemplar.findAll()
    .then((ejemplares) => respuesta.status(200).json(ejemplares))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los ejemplares', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEjemplar.findByPk(id)
    .then((ejemplar) => {
      if (!ejemplar) return respuesta.status(404).json({ mensaje: 'Ejemplar no encontrado' });
      respuesta.status(200).json(ejemplar);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el ejemplar', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelEjemplar.create(peticion.body)
    .then((nuevoEjemplar) => respuesta.status(201).json(nuevoEjemplar))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el ejemplar', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEjemplar.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Ejemplar no encontrado o sin cambios' });
      return ModelEjemplar.findByPk(id);
    })
    .then((ejemplarActualizado) => {
      if (ejemplarActualizado) respuesta.status(200).json(ejemplarActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el ejemplar', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelEjemplar.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Ejemplar no encontrado' });
      respuesta.status(200).json({ mensaje: 'Ejemplar eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el ejemplar', error: error.message }));
};