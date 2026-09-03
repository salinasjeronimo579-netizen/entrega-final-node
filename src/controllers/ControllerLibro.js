import ModelLibro from '../models/ModelLibro.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelLibro.findAll()
    .then((libros) => respuesta.status(200).json(libros))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los libros', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibro.findByPk(id)
    .then((libro) => {
      if (!libro) return respuesta.status(404).json({ mensaje: 'Libro no encontrado' });
      respuesta.status(200).json(libro);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el libro', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelLibro.create(peticion.body)
    .then((nuevoLibro) => respuesta.status(201).json(nuevoLibro))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el libro', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibro.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Libro no encontrado o sin cambios' });
      return ModelLibro.findByPk(id);
    })
    .then((libroActualizado) => {
      if (libroActualizado) respuesta.status(200).json(libroActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el libro', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelLibro.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Libro no encontrado' });
      respuesta.status(200).json({ mensaje: 'Libro eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el libro', error: error.message }));
};