import ModelMulta from '../models/ModelMulta.js';

export const obtenerTodos = (peticion, respuesta) => {
  ModelMulta.findAll()
    .then((multas) => respuesta.status(200).json(multas))
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al obtener las multas', error: error.message }));
};

export const obtenerPorId = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelMulta.findByPk(id)
    .then((multa) => {
      if (!multa) return respuesta.status(404).json({ mensaje: 'Multa no encontrada' });
      respuesta.status(200).json(multa);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al buscar la multa', error: error.message }));
};

export const crear = (peticion, respuesta) => {
  ModelMulta.create(peticion.body)
    .then((nuevaMulta) => respuesta.status(201).json(nuevaMulta))
    .catch((error) => respuesta.status(400).json({ mensaje: 'Error al crear la multa', error: error.message }));
};

export const actualizar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelMulta.update(peticion.body, { where: { id } })
    .then(([filasAfectadas]) => {
      if (filasAfectadas === 0) return respuesta.status(404).json({ mensaje: 'Multa no encontrada o sin cambios' });
      return ModelMulta.findByPk(id);
    })
    .then((multaActualizada) => {
      if (multaActualizada) respuesta.status(200).json(multaActualizada);
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al actualizar la multa', error: error.message }));
};

export const eliminar = (peticion, respuesta) => {
  const { id } = peticion.params;
  ModelMulta.destroy({ where: { id } })
    .then((filasEliminadas) => {
      if (filasEliminadas === 0) return respuesta.status(404).json({ mensaje: 'Multa no encontrada' });
      respuesta.status(200).json({ mensaje: 'Multa eliminada correctamente' });
    })
    .catch((error) => respuesta.status(500).json({ mensaje: 'Error al eliminar la multa', error: error.message }));
};