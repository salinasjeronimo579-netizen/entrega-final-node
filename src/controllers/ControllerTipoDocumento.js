import ModelTipoDocumento from '../models/ModelTipoDocumento.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelTipoDocumento.findAll()
    .then((tipos) => respuesta.status(200).json(tipos))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los tipos de documento', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoDocumento.findByPk(id)
    .then((tipo) => {
      if (!tipo) return respuesta.status(404).json({ mensaje: 'Tipo de documento no encontrado' });
      respuesta.status(200).json(tipo);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el tipo de documento', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelTipoDocumento.create(peticion.body)
    .then((nuevoTipo) => respuesta.status(201).json(nuevoTipo))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el tipo de documento', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoDocumento.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Tipo de documento no encontrado o sin cambios' });
      return ModelTipoDocumento.findByPk(id);
    })
    .then((tipoActualizado) => {
      if (tipoActualizado) respuesta.status(200).json(tipoActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el tipo de documento', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelTipoDocumento.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Tipo de documento no encontrado' });
      respuesta.status(200).json({ mensaje: 'Tipo de documento eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el tipo de documento', error: error.message }));
};