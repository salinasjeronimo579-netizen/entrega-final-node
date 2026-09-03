import ModelRol from '../models/ModelRol.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelRol.findAll()
    .then((roles) => respuesta.status(200).json(roles))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener los roles', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelRol.findByPk(id)
    .then((rol) => {
      if (!rol) return respuesta.status(404).json({ mensaje: 'Rol no encontrado' });
      respuesta.status(200).json(rol);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar el rol', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelRol.create(peticion.body)
    .then((nuevoRol) => respuesta.status(201).json(nuevoRol))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear el rol', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelRol.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Rol no encontrado o sin cambios' });
      return ModelRol.findByPk(id);
    })
    .then((rolActualizado) => {
      if (rolActualizado) respuesta.status(200).json(rolActualizado);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar el rol', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelRol.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Rol no encontrado' });
      respuesta.status(200).json({ mensaje: 'Rol eliminado correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar el rol', error: error.message }));
};