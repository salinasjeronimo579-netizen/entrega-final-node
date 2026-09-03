import ModelAutor from '../models/ModelAutor.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelAutor.findAll()
    .then((autores) => respuesta.status(200).json(autores))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los autores', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelAutor.findByPk(id)
    .then((autor) => {
      if (!autor) return respuesta.status(404).json({ mensaje: 'Autor no encontrado' });
      respuesta.status(200).json(autor);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el autor', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelAutor.create(peticion.body)
    .then((nuevoAutor) => respuesta.status(201).json(nuevoAutor))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el autor', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelAutor.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Autor no encontrado o sin cambios' });
      return ModelAutor.findByPk(id);
    })
    .then((autorActualizado) => {
      if (autorActualizado) respuesta.status(200).json(autorActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el autor', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelAutor.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Autor no encontrado' });
      respuesta.status(200).json({ mensaje: 'Autor eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el autor', error: error.message }));
};