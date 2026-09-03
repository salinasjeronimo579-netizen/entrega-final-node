import ModelCategoria from '../models/ModelCategoria.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelCategoria.findAll()
    .then((categorias) => respuesta.status(200).json(categorias))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener las categorías', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelCategoria.findByPk(id)
    .then((categoria) => {
      if (!categoria) return respuesta.status(404).json({ mensaje: 'Categoría no encontrada' });
      respuesta.status(200).json(categoria);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar la categoría', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelCategoria.create(peticion.body)
    .then((nuevaCategoria) => respuesta.status(201).json(nuevaCategoria))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear la categoría', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelCategoria.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Categoría no encontrada o sin cambios' });
      return ModelCategoria.findByPk(id);
    })
    .then((categoriaActualizada) => {
      if (categoriaActualizada) respuesta.status(200).json(categoriaActualizada);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelCategoria.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Categoría no encontrada' });
      respuesta.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar la categoría', error: error.message }));
};