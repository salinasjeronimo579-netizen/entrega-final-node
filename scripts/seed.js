import { conn } from "../src/config/database.js";
import "../src/models/index.js";

import { ModelRol } from "../src/models/ModelRol.js";
import { ModelTipoDocumento } from "../src/models/ModelTipoDocumento.js";
import { ModelEstadoUsuario } from "../src/models/ModelEstadoUsuario.js";
import { ModelUsuario } from "../src/models/ModelUsuario.js";
import { ModelPais } from "../src/models/ModelPais.js";
import { ModelEditorial } from "../src/models/ModelEditorial.js";
import { ModelIdioma } from "../src/models/ModelIdioma.js";
import { ModelLibro } from "../src/models/ModelLibro.js";
import { ModelAutor } from "../src/models/ModelAutor.js";
import { ModelLibroAutor } from "../src/models/ModelLibroAutor.js";
import { ModelCategoria } from "../src/models/ModelCategoria.js";
import { ModelLibroCategoria } from "../src/models/ModelLibroCategoria.js";
import { ModelEstadoEjemplar } from "../src/models/ModelEstadoEjemplar.js";
import { ModelEjemplar } from "../src/models/ModelEjemplar.js";
import { ModelEstadoPrestamo } from "../src/models/ModelEstadoPrestamo.js";
import { ModelPrestamo } from "../src/models/ModelPrestamo.js";
import { ModelEstadoReserva } from "../src/models/ModelEstadoReserva.js";
import { ModelReserva } from "../src/models/ModelReserva.js";
import { ModelEstadoMulta } from "../src/models/ModelEstadoMulta.js";
import { ModelMulta } from "../src/models/ModelMulta.js";
import { ModelTipoNotificacion } from "../src/models/ModelTipoNotificacion.js";
import { ModelNotificacion } from "../src/models/ModelNotificacion.js";

// Busca por el campo "natural" de cada catálogo y solo crea si no existe,
// para poder correr el seed varias veces sin duplicar las tablas maestras.
async function upsertLookup(Model, where, defaults = {}) {
  const [registro] = await Model.findOrCreate({ where, defaults: { ...where, ...defaults } });
  return registro;
}

async function seedMaestras() {
  const roles = {
    Cliente: await upsertLookup(ModelRol, { nombre_rol: "Cliente" }, { descripcion_rol: "Usuario cliente de la biblioteca" }),
    Bibliotecario: await upsertLookup(ModelRol, { nombre_rol: "Bibliotecario" }, { descripcion_rol: "Gestiona préstamos, reservas y el catálogo" }),
    Administrador: await upsertLookup(ModelRol, { nombre_rol: "Administrador" }, { descripcion_rol: "Administra el sistema completo, usuarios y catálogo" }),
  };

  const tiposDocumento = {
    CC: await upsertLookup(ModelTipoDocumento, { codigo: "CC" }, { nombre: "Cedula de ciudadania" }),
    CE: await upsertLookup(ModelTipoDocumento, { codigo: "CE" }, { nombre: "Cedula de extranjeria" }),
    PA: await upsertLookup(ModelTipoDocumento, { codigo: "PA" }, { nombre: "Pasaporte" }),
    TI: await upsertLookup(ModelTipoDocumento, { codigo: "TI" }, { nombre: "Tarjeta de identidad" }),
  };

  const estadosUsuario = {
    Activo: await upsertLookup(ModelEstadoUsuario, { nombre_estado_usuario: "Activo" }),
    Inactivo: await upsertLookup(ModelEstadoUsuario, { nombre_estado_usuario: "Inactivo" }),
    Suspendido: await upsertLookup(ModelEstadoUsuario, { nombre_estado_usuario: "Suspendido" }),
  };

  const paises = {
    Colombia: await upsertLookup(ModelPais, { nombre_pais: "Colombia" }),
    Argentina: await upsertLookup(ModelPais, { nombre_pais: "Argentina" }),
    Mexico: await upsertLookup(ModelPais, { nombre_pais: "Mexico" }),
    Espana: await upsertLookup(ModelPais, { nombre_pais: "Espana" }),
    Chile: await upsertLookup(ModelPais, { nombre_pais: "Chile" }),
    Peru: await upsertLookup(ModelPais, { nombre_pais: "Peru" }),
  };

  const idiomas = {
    Espanol: await upsertLookup(ModelIdioma, { nombre: "Espanol" }),
    Ingles: await upsertLookup(ModelIdioma, { nombre: "Ingles" }),
    Frances: await upsertLookup(ModelIdioma, { nombre: "Frances" }),
    Portugues: await upsertLookup(ModelIdioma, { nombre: "Portugues" }),
  };

  const categorias = {
    Novela: await upsertLookup(ModelCategoria, { nombre: "Novela" }),
    Ficcion: await upsertLookup(ModelCategoria, { nombre: "Ficcion" }, { descripcion: "Narrativa de ficción" }),
    NoFiccion: await upsertLookup(ModelCategoria, { nombre: "No ficcion" }, { descripcion: "Ensayo, divulgación y no ficción" }),
    Ciencia: await upsertLookup(ModelCategoria, { nombre: "Ciencia" }, { descripcion: "Libros de divulgación científica" }),
    Historia: await upsertLookup(ModelCategoria, { nombre: "Historia" }, { descripcion: "Libros de historia" }),
  };

  const estadosEjemplar = {
    Disponible: await upsertLookup(ModelEstadoEjemplar, { nombre_estado: "Disponible" }),
    Prestado: await upsertLookup(ModelEstadoEjemplar, { nombre_estado: "Prestado" }),
    EnReparacion: await upsertLookup(ModelEstadoEjemplar, { nombre_estado: "En reparacion" }),
    Perdido: await upsertLookup(ModelEstadoEjemplar, { nombre_estado: "Perdido" }),
  };

  const estadosPrestamo = {
    Activo: await upsertLookup(ModelEstadoPrestamo, { nombre_estado: "Activo" }),
    Devuelto: await upsertLookup(ModelEstadoPrestamo, { nombre_estado: "Devuelto" }),
    Vencido: await upsertLookup(ModelEstadoPrestamo, { nombre_estado: "Vencido" }),
  };

  const estadosReserva = {
    Activa: await upsertLookup(ModelEstadoReserva, { nombre_estado: "Activa" }),
    Pendiente: await upsertLookup(ModelEstadoReserva, { nombre_estado: "Pendiente" }),
    Confirmada: await upsertLookup(ModelEstadoReserva, { nombre_estado: "Confirmada" }),
    Cumplida: await upsertLookup(ModelEstadoReserva, { nombre_estado: "Cumplida" }),
    Cancelada: await upsertLookup(ModelEstadoReserva, { nombre_estado: "Cancelada" }),
  };

  const estadosMulta = {
    Pendiente: await upsertLookup(ModelEstadoMulta, { nombre_estado: "Pendiente" }),
    Pagada: await upsertLookup(ModelEstadoMulta, { nombre_estado: "Pagada" }),
  };

  const tiposNotificacion = {
    Recordatorio: await upsertLookup(ModelTipoNotificacion, { nombre: "Recordatorio" }),
    Vencimiento: await upsertLookup(ModelTipoNotificacion, { nombre: "Vencimiento" }),
    Multa: await upsertLookup(ModelTipoNotificacion, { nombre: "Multa" }),
    General: await upsertLookup(ModelTipoNotificacion, { nombre: "General" }),
  };

  return {
    roles, tiposDocumento, estadosUsuario, paises, idiomas, categorias,
    estadosEjemplar, estadosPrestamo, estadosReserva, estadosMulta, tiposNotificacion,
  };
}

async function seedUsuarios(maestras) {
  const nuevos = [
    {
      numero_documento: "700111222",
      nombre: "Maria",
      segundo_nombre: "Elena",
      primer_apellido: "Rodriguez",
      segundo_apellido: "Perez",
      telefono: "+57 300 111 2222",
      email: "maria.rodriguez@biblioteca.com",
      direccion: "Calle 10 # 5-23",
      fecha_registro: new Date("2026-01-10"),
      id_rol: maestras.roles.Bibliotecario.id_rol,
      id_tipo_documento: maestras.tiposDocumento.CC.id_tipo_documento,
      id_estado_cliente: maestras.estadosUsuario.Activo.id_estado_usuario,
    },
    {
      numero_documento: "700333444",
      nombre: "Jorge",
      primer_apellido: "Martinez",
      telefono: "+57 301 333 4444",
      email: "jorge.martinez@biblioteca.com",
      direccion: "Carrera 8 # 12-45",
      fecha_registro: new Date("2026-01-15"),
      id_rol: maestras.roles.Administrador.id_rol,
      id_tipo_documento: maestras.tiposDocumento.CE.id_tipo_documento,
      id_estado_cliente: maestras.estadosUsuario.Activo.id_estado_usuario,
    },
    {
      numero_documento: "700555666",
      nombre: "Sofia",
      primer_apellido: "Gomez",
      segundo_apellido: "Diaz",
      telefono: "+57 302 555 6666",
      email: "sofia.gomez@example.com",
      direccion: "Av. Siempre Viva 742",
      fecha_registro: new Date("2026-03-02"),
      id_rol: maestras.roles.Cliente.id_rol,
      id_tipo_documento: maestras.tiposDocumento.TI.id_tipo_documento,
      id_estado_cliente: maestras.estadosUsuario.Activo.id_estado_usuario,
    },
    {
      numero_documento: "700777888",
      nombre: "Andres",
      primer_apellido: "Lopez",
      telefono: "+57 303 777 8888",
      email: "andres.lopez@example.com",
      direccion: "Calle 45 # 20-10",
      fecha_registro: new Date("2026-04-18"),
      id_rol: maestras.roles.Cliente.id_rol,
      id_tipo_documento: maestras.tiposDocumento.CC.id_tipo_documento,
      id_estado_cliente: maestras.estadosUsuario.Inactivo.id_estado_usuario,
    },
    {
      numero_documento: "700999000",
      nombre: "Camila",
      primer_apellido: "Torres",
      segundo_apellido: "Ramirez",
      telefono: "+57 304 999 0000",
      email: "camila.torres@example.com",
      direccion: "Diagonal 30 # 8-15",
      fecha_registro: new Date("2026-05-22"),
      id_rol: maestras.roles.Cliente.id_rol,
      id_tipo_documento: maestras.tiposDocumento.PA.id_tipo_documento,
      id_estado_cliente: maestras.estadosUsuario.Suspendido.id_estado_usuario,
    },
  ];

  const creados = {};
  for (const data of nuevos) {
    const [usuario] = await ModelUsuario.findOrCreate({ where: { numero_documento: data.numero_documento }, defaults: data });
    creados[data.nombre] = usuario;
  }
  return creados;
}

async function seedEditoriales(maestras) {
  const nuevas = [
    { nombre_editorial: "Penguin Random House", email: "contacto@penguinrh.com", pagina_web: "https://www.penguinrandomhouse.com", id_pais: maestras.paises.Espana.id_pais },
    { nombre_editorial: "Anagrama", email: "info@anagrama.es", pagina_web: "https://www.anagrama-ed.es", id_pais: maestras.paises.Espana.id_pais },
    { nombre_editorial: "Tusquets Editores", email: "contacto@tusquets.com", pagina_web: "https://www.tusquetseditores.com", id_pais: maestras.paises.Argentina.id_pais },
  ];
  const creadas = {};
  for (const data of nuevas) {
    const [editorial] = await ModelEditorial.findOrCreate({ where: { nombre_editorial: data.nombre_editorial }, defaults: data });
    creadas[data.nombre_editorial] = editorial;
  }
  return creadas;
}

async function seedAutores() {
  const nuevos = [
    { nombre: "Isabel", apellido: "Allende", nacionalidad: "Chilena", fecha_nacimiento: "1942-08-02", biografia: "Escritora chilena, autora de La casa de los espíritus." },
    { nombre: "Jorge Luis", apellido: "Borges", nacionalidad: "Argentina", fecha_nacimiento: "1899-08-24", biografia: "Escritor argentino, maestro del cuento y el ensayo." },
    { nombre: "Mario", apellido: "Vargas Llosa", nacionalidad: "Peruana", fecha_nacimiento: "1936-03-28", biografia: "Escritor peruano, premio Nobel de Literatura 2010." },
    { nombre: "Julio", apellido: "Cortazar", nacionalidad: "Argentina", fecha_nacimiento: "1914-08-26", biografia: "Escritor argentino, autor de Rayuela." },
    { nombre: "Laura", apellido: "Esquivel", nacionalidad: "Mexicana", fecha_nacimiento: "1950-09-30", biografia: "Escritora mexicana, autora de Como agua para chocolate." },
  ];
  const creados = {};
  for (const data of nuevos) {
    const [autor] = await ModelAutor.findOrCreate({ where: { nombre: data.nombre, apellido: data.apellido }, defaults: data });
    creados[`${data.nombre} ${data.apellido}`] = autor;
  }
  return creados;
}

async function seedLibros(editoriales, idiomaEspanol) {
  const nuevos = [
    { titulo: "La casa de los espiritus", isbn: "978-8401341605", anio_publicacion: 1982, num_paginas: 448, sinopsis: "La saga de la familia Trueba narrada por varias generaciones.", id_editorial: editoriales["Anagrama"].id_editorial, id_idioma: idiomaEspanol.id_idioma },
    { titulo: "Ficciones", isbn: "978-8420633111", anio_publicacion: 1944, num_paginas: 224, sinopsis: "Colección de cuentos que exploran laberintos, espejos e infinitos.", id_editorial: editoriales["Penguin Random House"].id_editorial, id_idioma: idiomaEspanol.id_idioma },
    { titulo: "La ciudad y los perros", isbn: "978-8420471839", anio_publicacion: 1963, num_paginas: 419, sinopsis: "La vida de un grupo de cadetes en un colegio militar de Lima.", id_editorial: editoriales["Tusquets Editores"].id_editorial, id_idioma: idiomaEspanol.id_idioma },
    { titulo: "Rayuela", isbn: "978-8437604572", anio_publicacion: 1963, num_paginas: 736, sinopsis: "Novela experimental que puede leerse en múltiples órdenes.", id_editorial: editoriales["Anagrama"].id_editorial, id_idioma: idiomaEspanol.id_idioma },
    { titulo: "Como agua para chocolate", isbn: "978-9685270210", anio_publicacion: 1989, num_paginas: 246, sinopsis: "Una historia de amor y tradición culinaria en México.", id_editorial: editoriales["Penguin Random House"].id_editorial, id_idioma: idiomaEspanol.id_idioma },
  ];
  const creados = {};
  for (const data of nuevos) {
    const [libro] = await ModelLibro.findOrCreate({ where: { isbn: data.isbn }, defaults: data });
    creados[data.titulo] = libro;
  }
  return creados;
}

async function seedLibroAutorYCategoria(libros, autores, categorias, libroExistenteId) {
  const asociacionesAutor = [
    { id_libro: libros["La casa de los espiritus"].id_libro, id_autor: autores["Isabel Allende"].id_autor },
    { id_libro: libros["Ficciones"].id_libro, id_autor: autores["Jorge Luis Borges"].id_autor },
    { id_libro: libros["La ciudad y los perros"].id_libro, id_autor: autores["Mario Vargas Llosa"].id_autor },
    { id_libro: libros["Rayuela"].id_libro, id_autor: autores["Julio Cortazar"].id_autor },
    { id_libro: libros["Como agua para chocolate"].id_libro, id_autor: autores["Laura Esquivel"].id_autor },
  ];
  for (const rel of asociacionesAutor) {
    await ModelLibroAutor.findOrCreate({ where: rel });
  }

  const asociacionesCategoria = [
    { id_libro: libroExistenteId, id_categoria: categorias.Ficcion.id_categoria },
    { id_libro: libros["La casa de los espiritus"].id_libro, id_categoria: categorias.Novela.id_categoria },
    { id_libro: libros["Ficciones"].id_libro, id_categoria: categorias.Ficcion.id_categoria },
    { id_libro: libros["La ciudad y los perros"].id_libro, id_categoria: categorias.Novela.id_categoria },
    { id_libro: libros["Rayuela"].id_libro, id_categoria: categorias.Ficcion.id_categoria },
    { id_libro: libros["Como agua para chocolate"].id_libro, id_categoria: categorias.Novela.id_categoria },
  ];
  for (const rel of asociacionesCategoria) {
    await ModelLibroCategoria.findOrCreate({ where: rel });
  }
}

async function seedEjemplares(libros, estadosEjemplar) {
  const nuevos = [
    { codigo_inventario: "INV-002", ubicacion_estante: "A2", fecha_adquisicion: "2026-01-05", codigo_barras: "BC-002", id_libro: libros["La casa de los espiritus"].id_libro, id_estado_ejemplar: estadosEjemplar.Disponible.id_estado_ejemplar },
    { codigo_inventario: "INV-003", ubicacion_estante: "A3", fecha_adquisicion: "2026-01-10", codigo_barras: "BC-003", id_libro: libros["Ficciones"].id_libro, id_estado_ejemplar: estadosEjemplar.Prestado.id_estado_ejemplar },
    { codigo_inventario: "INV-004", ubicacion_estante: "B1", fecha_adquisicion: "2026-02-01", codigo_barras: "BC-004", id_libro: libros["La ciudad y los perros"].id_libro, id_estado_ejemplar: estadosEjemplar.Disponible.id_estado_ejemplar },
    { codigo_inventario: "INV-005", ubicacion_estante: "B2", fecha_adquisicion: "2026-02-10", codigo_barras: "BC-005", id_libro: libros["Rayuela"].id_libro, id_estado_ejemplar: estadosEjemplar.Prestado.id_estado_ejemplar },
    { codigo_inventario: "INV-006", ubicacion_estante: "C1", fecha_adquisicion: "2026-03-01", codigo_barras: "BC-006", id_libro: libros["Como agua para chocolate"].id_libro, id_estado_ejemplar: estadosEjemplar.EnReparacion.id_estado_ejemplar },
  ];
  const creados = {};
  for (const data of nuevos) {
    const [ejemplar] = await ModelEjemplar.findOrCreate({ where: { codigo_inventario: data.codigo_inventario }, defaults: data });
    creados[data.codigo_inventario] = ejemplar;
  }
  return creados;
}

async function seedPrestamos(ejemplares, usuariosExistentes, usuariosNuevos, estadosPrestamo, ejemplarExistenteId) {
  const nuevos = [
    {
      id_ejemplar: ejemplares["INV-003"].id_ejemplar,
      id_cliente: usuariosExistentes.Carlos,
      id_registrado_por: usuariosNuevos["Maria"].id_usuario,
      id_estado_prestamo: estadosPrestamo.Activo.id_estado_prestamo,
      fecha_prestamo: "2026-09-01",
      fecha_devolucion_esperada: "2026-09-15",
      observaciones: "Retirado en mostrador",
    },
    {
      id_ejemplar: ejemplares["INV-005"].id_ejemplar,
      id_cliente: usuariosNuevos["Sofia"].id_usuario,
      id_registrado_por: usuariosNuevos["Jorge"].id_usuario,
      id_estado_prestamo: estadosPrestamo.Activo.id_estado_prestamo,
      fecha_prestamo: "2026-09-05",
      fecha_devolucion_esperada: "2026-09-19",
    },
    {
      id_ejemplar: ejemplarExistenteId,
      id_cliente: usuariosNuevos["Andres"].id_usuario,
      id_registrado_por: usuariosNuevos["Maria"].id_usuario,
      id_estado_prestamo: estadosPrestamo.Devuelto.id_estado_prestamo,
      fecha_prestamo: "2026-08-01",
      fecha_devolucion_esperada: "2026-08-15",
      fecha_devolucion_real: "2026-08-14",
    },
    {
      id_ejemplar: ejemplares["INV-002"].id_ejemplar,
      id_cliente: usuariosNuevos["Camila"].id_usuario,
      id_registrado_por: usuariosNuevos["Jorge"].id_usuario,
      id_estado_prestamo: estadosPrestamo.Devuelto.id_estado_prestamo,
      fecha_prestamo: "2026-07-01",
      fecha_devolucion_esperada: "2026-07-15",
      fecha_devolucion_real: "2026-07-20",
      observaciones: "Devuelto con 5 dias de retraso",
    },
    {
      id_ejemplar: ejemplares["INV-004"].id_ejemplar,
      id_cliente: usuariosExistentes.Ana,
      id_registrado_por: usuariosNuevos["Maria"].id_usuario,
      id_estado_prestamo: estadosPrestamo.Vencido.id_estado_prestamo,
      fecha_prestamo: "2026-08-10",
      fecha_devolucion_esperada: "2026-08-24",
      observaciones: "Vencido, el cliente aun no lo ha devuelto",
    },
  ];
  const creados = [];
  for (const data of nuevos) {
    creados.push(await ModelPrestamo.create(data));
  }
  return creados;
}

async function seedReservas(libros, usuariosExistentes, usuariosNuevos, estadosReserva, libroExistenteId) {
  const nuevos = [
    { id_libro: libros["La casa de los espiritus"].id_libro, id_cliente: usuariosExistentes.Luis, id_estado_reserva: estadosReserva.Activa.id_estado_reserva, fecha_reserva: "2026-09-10", fecha_expiracion: "2026-09-17" },
    { id_libro: libros["Ficciones"].id_libro, id_cliente: usuariosNuevos["Sofia"].id_usuario, id_estado_reserva: estadosReserva.Pendiente.id_estado_reserva, fecha_reserva: "2026-09-12", fecha_expiracion: "2026-09-19" },
    { id_libro: libros["La ciudad y los perros"].id_libro, id_cliente: usuariosNuevos["Andres"].id_usuario, id_estado_reserva: estadosReserva.Confirmada.id_estado_reserva, fecha_reserva: "2026-09-08", fecha_expiracion: "2026-09-15" },
    { id_libro: libros["Rayuela"].id_libro, id_cliente: usuariosNuevos["Camila"].id_usuario, id_estado_reserva: estadosReserva.Cumplida.id_estado_reserva, fecha_reserva: "2026-08-01", fecha_expiracion: "2026-08-08" },
    { id_libro: libroExistenteId, id_cliente: usuariosExistentes.Carlos, id_estado_reserva: estadosReserva.Cancelada.id_estado_reserva, fecha_reserva: "2026-08-15", fecha_expiracion: "2026-08-22" },
  ];
  const creados = [];
  for (const data of nuevos) {
    creados.push(await ModelReserva.create(data));
  }
  return creados;
}

async function seedMultas(prestamos, estadosMulta) {
  const nuevos = [
    { id_prestamo: prestamos[3].id_prestamo, id_estado_multa: estadosMulta.Pagada.id_estado_multa, monto: 8000.0, motivo: "Devolucion fuera de plazo", fecha_generada: "2026-07-21", fecha_pago: "2026-07-25" },
    { id_prestamo: prestamos[4].id_prestamo, id_estado_multa: estadosMulta.Pendiente.id_estado_multa, monto: 15000.0, motivo: "Prestamo vencido sin devolucion", fecha_generada: "2026-08-25" },
    { id_prestamo: prestamos[2].id_prestamo, id_estado_multa: estadosMulta.Pagada.id_estado_multa, monto: 5000.0, motivo: "Dano menor en la portada", fecha_generada: "2026-08-15", fecha_pago: "2026-08-16" },
    { id_prestamo: prestamos[0].id_prestamo, id_estado_multa: estadosMulta.Pendiente.id_estado_multa, monto: 3000.0, motivo: "Retraso en devolucion parcial", fecha_generada: "2026-09-14" },
    { id_prestamo: prestamos[1].id_prestamo, id_estado_multa: estadosMulta.Pendiente.id_estado_multa, monto: 2000.0, motivo: "Extravio del codigo de barras original", fecha_generada: "2026-09-13" },
  ];
  const creados = [];
  for (const data of nuevos) {
    creados.push(await ModelMulta.create(data));
  }
  return creados;
}

async function seedNotificaciones(usuariosExistentes, usuariosNuevos, tiposNotificacion, prestamos, reservas, multas) {
  const nuevos = [
    { id_cliente: usuariosExistentes.Carlos, id_tipo_notificacion: tiposNotificacion.Vencimiento.id_tipo_notificacion, mensaje: "Tu prestamo vence en 2 dias", referencia_id: prestamos[0].id_prestamo, tipo_referencia: "prestamo", fecha_envio: new Date("2026-09-13") },
    { id_cliente: usuariosNuevos["Sofia"].id_usuario, id_tipo_notificacion: tiposNotificacion.Vencimiento.id_tipo_notificacion, mensaje: "Tu prestamo vence manana", referencia_id: prestamos[1].id_prestamo, tipo_referencia: "prestamo", fecha_envio: new Date("2026-09-18") },
    { id_cliente: usuariosNuevos["Andres"].id_usuario, id_tipo_notificacion: tiposNotificacion.Multa.id_tipo_notificacion, mensaje: "Se genero una multa por devolucion tardia", referencia_id: multas[0].id_multa, tipo_referencia: "multa", fecha_envio: new Date("2026-07-21"), leida: true },
    { id_cliente: usuariosNuevos["Camila"].id_usuario, id_tipo_notificacion: tiposNotificacion.General.id_tipo_notificacion, mensaje: "Bienvenida a la biblioteca Booker", fecha_envio: new Date("2026-05-22") },
    { id_cliente: usuariosExistentes.Ana, id_tipo_notificacion: tiposNotificacion.Recordatorio.id_tipo_notificacion, mensaje: "Recuerda que tienes una reserva confirmada", referencia_id: reservas[2].id_reserva, tipo_referencia: "reserva", fecha_envio: new Date("2026-09-08") },
  ];
  for (const data of nuevos) {
    await ModelNotificacion.create(data);
  }
}

async function contarTablas() {
  const modelos = {
    Roles: ModelRol,
    Tipos_Documento: ModelTipoDocumento,
    Estados_Usuario: ModelEstadoUsuario,
    Usuarios: ModelUsuario,
    Paises: ModelPais,
    Editoriales: ModelEditorial,
    Idiomas: ModelIdioma,
    Libros: ModelLibro,
    Autores: ModelAutor,
    Libro_Autor: ModelLibroAutor,
    Categorias: ModelCategoria,
    Libro_Categoria: ModelLibroCategoria,
    Estados_Ejemplar: ModelEstadoEjemplar,
    Ejemplares: ModelEjemplar,
    Estados_Prestamo: ModelEstadoPrestamo,
    Prestamos: ModelPrestamo,
    Estados_Reserva: ModelEstadoReserva,
    Reservas: ModelReserva,
    Estados_Multa: ModelEstadoMulta,
    Multas: ModelMulta,
    Tipos_Notificacion: ModelTipoNotificacion,
    Notificaciones: ModelNotificacion,
  };
  const conteos = {};
  for (const [nombre, Modelo] of Object.entries(modelos)) {
    conteos[nombre] = await Modelo.count();
  }
  return conteos;
}

async function main() {
  await conn.authenticate();
  await conn.sync(); // no destructivo: crea tablas si faltan, no borra nada existente

  const maestras = await seedMaestras();

  // IDs de los datos que ya existian en la base antes de este seed (no se tocan).
  const usuarioAnaExistente = await ModelUsuario.findOne({ where: { numero_documento: "123456" } });
  const usuarioLuisExistente = await ModelUsuario.findOne({ where: { numero_documento: "999999" } });
  const usuarioCarlosExistente = await ModelUsuario.findOne({ where: { numero_documento: "555555" } });
  const libroExistente = await ModelLibro.findOne({ where: { isbn: "978-0307474728" } });
  const ejemplarExistente = await ModelEjemplar.findOne({ where: { codigo_inventario: "INV-001" } });

  const usuariosExistentes = {
    Ana: usuarioAnaExistente.id_usuario,
    Luis: usuarioLuisExistente.id_usuario,
    Carlos: usuarioCarlosExistente.id_usuario,
  };

  const usuariosNuevos = await seedUsuarios(maestras);
  const editoriales = await seedEditoriales(maestras);
  const autores = await seedAutores();
  const libros = await seedLibros(editoriales, maestras.idiomas.Espanol);
  await seedLibroAutorYCategoria(libros, autores, maestras.categorias, libroExistente.id_libro);
  const ejemplares = await seedEjemplares(libros, maestras.estadosEjemplar);
  const prestamos = await seedPrestamos(ejemplares, usuariosExistentes, usuariosNuevos, maestras.estadosPrestamo, ejemplarExistente.id_ejemplar);
  const reservas = await seedReservas(libros, usuariosExistentes, usuariosNuevos, maestras.estadosReserva, libroExistente.id_libro);
  const multas = await seedMultas(prestamos, maestras.estadosMulta);
  await seedNotificaciones(usuariosExistentes, usuariosNuevos, maestras.tiposNotificacion, prestamos, reservas, multas);

  const conteos = await contarTablas();
  console.log("Seed completado. Conteo real de filas por tabla (SELECT COUNT(*)):");
  for (const [tabla, cantidad] of Object.entries(conteos)) {
    console.log(`  ${tabla}: ${cantidad}`);
  }

  await conn.close();
}

main().catch((error) => {
  console.error("Error al correr el seed:", error);
  process.exit(1);
});
