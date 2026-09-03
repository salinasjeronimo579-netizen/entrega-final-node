import ModelPais from '../models/ModelPais.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelPais.findAll()
    .then((paises) => respuesta.status(200).json(paises))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los países', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPais.findByPk(id)
    .then((pais) => {
      if (!pais) return respuesta.status(404).json({ mensaje: 'País no encontrado' });
      respuesta.status(200).json(pais);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el país', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelPais.create(peticion.body)
    .then((nuevoPais) => respuesta.status(201).json(nuevoPais))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el país', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPais.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'País no encontrado o sin cambios' });
      return ModelPais.findByPk(id);
    })
    .then((paisActualizado) => {
      if (paisActualizado) respuesta.status(200).json(paisActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el país', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelPais.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'País no encontrado' });
      respuesta.status(200).json({ mensaje: 'País eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el país', error: error.message }));
};