import ModelIdioma from '../models/ModelIdioma.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelIdioma.findAll()
    .then((idiomas) => respuesta.status(200).json(idiomas))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los idiomas', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelIdioma.findByPk(id)
    .then((idioma) => {
      if (!idioma) return respuesta.status(404).json({ mensaje: 'Idioma no encontrado' });
      respuesta.status(200).json(idioma);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el idioma', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelIdioma.create(peticion.body)
    .then((nuevoIdioma) => respuesta.status(201).json(nuevoIdioma))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el idioma', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelIdioma.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Idioma no encontrado o sin cambios' });
      return ModelIdioma.findByPk(id);
    })
    .then((idiomaActualizado) => {
      if (idiomaActualizado) respuesta.status(200).json(idiomaActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el idioma', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelIdioma.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Idioma no encontrado' });
      respuesta.status(200).json({ mensaje: 'Idioma eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el idioma', error: error.message }));
};