import ModelLibroCategoria from '../models/ModelLibroCategoria.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelLibroCategoria.findAll()
    .then((relaciones) => respuesta.status(200).json(relaciones))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener las relaciones libro-categoría', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibroCategoria.findByPk(id)
    .then((relacion) => {
      if (!relacion) return respuesta.status(404).json({ mensaje: 'Relación no encontrada' });
      respuesta.status(200).json(relacion);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar la relación', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelLibroCategoria.create(peticion.body)
    .then((nuevaRelacion) => respuesta.status(201).json(nuevaRelacion))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al asociar el libro con la categoría', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibroCategoria.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Relación no encontrada o sin cambios' });
      return ModelLibroCategoria.findByPk(id);
    })
    .then((relacionActualizada) => {
      if (relacionActualizada) respuesta.status(200).json(relacionActualizada);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar la relación', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibroCategoria.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Relación no encontrada' });
      respuesta.status(200).json({ mensaje: 'Relación eliminada correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar la relación', error: error.message }));
};