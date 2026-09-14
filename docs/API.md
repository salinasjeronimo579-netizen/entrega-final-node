# API — Booker (sistema de gestión de biblioteca)

## Overview

- **Stack:** Node.js + Express 5 + Sequelize 6 sobre MySQL (`mysql2`).
- **Base URL:** `http://localhost:3000` (puerto fijo definido en `index.js`, variable `PORT = 3000`).
- **Prefijo de rutas:** todos los endpoints cuelgan de `/api/...` (definido directamente en cada router, no hay un prefijo global aplicado en `src/routes/index.js`).
- **Formato:** JSON. El servidor habilita `express.json()`, así que todo `POST`/`PATCH` debe enviar `Content-Type: application/json`.
- **Autenticación:** **no hay autenticación implementada.** No existe middleware de auth, JWT, sesiones ni verificación de usuario en `index.js` ni en ningún router/controller. Todos los endpoints son de acceso libre.
- **Timestamps:** casi todos los modelos tienen `timestamps: true` (Sequelize agrega `createdAt` y `updatedAt` automáticamente a cada registro devuelto). Las excepciones son las tablas intermedias `Libro_Autor` y `Libro_Categoria` (`timestamps: false`).
- **Patrón común de respuesta de error:** los controllers no tienen un manejador de errores centralizado; cada uno captura el error de su propia promesa y responde `{ mensaje: "...", error: error.message }` con el status code que se indica en cada endpoint.

### Endpoints en el código pero sin ruta activa

Varios controllers exportan funciones de búsqueda (`buscarPorNombre`, `buscarPorCorreo`, `buscarPorCodigo`, `buscarPorTitulo`, `obtenerPorId`) que **no están conectadas a ningún router** (no aparecen en `src/routes/*.js`). Existen en el código pero hoy no son alcanzables vía HTTP. No se documentan como endpoints reales más abajo; se listan al final de cada recurso donde aplica.

---

## Índice de recursos

1. [Autores](#autores)
2. [Categorías](#categorías)
3. [Editoriales](#editoriales)
4. [Ejemplares](#ejemplares)
5. [Estados de Ejemplar](#estados-de-ejemplar)
6. [Estados de Multa](#estados-de-multa)
7. [Estados de Préstamo](#estados-de-préstamo)
8. [Estados de Reserva](#estados-de-reserva)
9. [Estados de Usuario](#estados-de-usuario)
10. [Idiomas](#idiomas)
11. [Libros](#libros)
12. [Multas](#multas)
13. [Notificaciones](#notificaciones)
14. [Países](#países)
15. [Préstamos](#préstamos)
16. [Reservas](#reservas)
17. [Roles](#roles)
18. [Tipos de Documento](#tipos-de-documento)
19. [Tipos de Notificación](#tipos-de-notificación)
20. [Usuarios](#usuarios)

---

## Autores

Router: `src/routes/RouterAutores.js` · Controller: `src/controllers/ControllerAutor.js` · Modelo: `Autor` (tabla `Autores`)

Base path: `/api/autores`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/autores/` | Lista todos los autores |
| POST | `/api/autores/` | Crea un autor |
| PATCH | `/api/autores/:id` | Edita un autor |
| DELETE | `/api/autores/:id` | Elimina un autor |

Campos del modelo: `id_autor` (PK, auto), `nombre` (string, requerido), `apellido` (string, requerido), `nacionalidad` (string, requerido), `fecha_nacimiento` (date, requerido), `biografia` (string, opcional).

**POST /api/autores/** — body de ejemplo:
```json
{
  "nombre": "Gabriel",
  "apellido": "García Márquez",
  "nacionalidad": "Colombiana",
  "fecha_nacimiento": "1927-03-06",
  "biografia": "Escritor colombiano, premio Nobel de Literatura 1982."
}
```
Response `201 Created`: el registro creado (incluye `id_autor`, `createdAt`, `updatedAt`).

**Errores:**
- `400` — faltan `nombre`, `apellido`, `nacionalidad` o `fecha_nacimiento` (o error de Sequelize) al crear/editar.
- `404` — al editar o eliminar, el `id` no existe (o el `PATCH` no modificó filas).
- `500` — error de base de datos al listar o al eliminar.

_No conectado a ruta:_ `buscarPorNombre` (búsqueda por `?nombre=`).

---

## Categorías

Router: `src/routes/RouterCategorias.js` · Controller: `src/controllers/ControllerCategoria.js` · Modelo: `Categoria` (tabla `Categorias`)

Base path: `/api/categorias`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/categorias/` | Lista todas las categorías |
| POST | `/api/categorias/` | Crea una categoría |
| PATCH | `/api/categorias/:id` | Edita una categoría |
| DELETE | `/api/categorias/:id` | Elimina una categoría |

Campos: `id_categoria` (PK, auto), `nombre` (string, requerido), `descripcion` (string, opcional).

**POST /api/categorias/** — body de ejemplo:
```json
{
  "nombre": "Ciencia ficción",
  "descripcion": "Libros de ciencia ficción y especulativa"
}
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre` o error al crear/editar · `404` no encontrada al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Editoriales

Router: `src/routes/RouterEditoriales.js` · Controller: `src/controllers/ControllerEditorial.js` · Modelo: `Editorial` (tabla `Editoriales`)

Base path: `/api/editoriales`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/editoriales/` | Lista todas las editoriales |
| POST | `/api/editoriales/` | Crea una editorial |
| PATCH | `/api/editoriales/:id` | Edita una editorial |
| DELETE | `/api/editoriales/:id` | Elimina una editorial |

Campos: `id_editorial` (PK, auto), `nombre_editorial` (string, requerido), `telefono` (string, opcional), `email` (string, requerido), `pagina_web` (string, opcional), `id_pais` (FK a País, agregada por asociación, opcional).

**POST /api/editoriales/** — body de ejemplo:
```json
{
  "nombre_editorial": "Editorial Sudamericana",
  "telefono": "+54 11 4123-4567",
  "email": "contacto@sudamericana.com",
  "pagina_web": "https://www.sudamericana.com",
  "id_pais": 1
}
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_editorial` o `email` (o error al crear/editar) · `404` no encontrada al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Ejemplares

Router: `src/routes/RouterEjemplares.js` · Controller: `src/controllers/ControllerEjemplar.js` · Modelo: `Ejemplar` (tabla `Ejemplares`)

Base path: `/api/ejemplares`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/ejemplares/` | Lista todos los ejemplares |
| POST | `/api/ejemplares/` | Crea un ejemplar |
| PATCH | `/api/ejemplares/:id` | Edita un ejemplar |
| DELETE | `/api/ejemplares/:id` | Elimina un ejemplar |

Campos: `id_ejemplar` (PK, auto), `codigo_inventario` (string, requerido), `ubicacion_estante` (string, requerido), `fecha_adquisicion` (date, requerido), `codigo_barras` (string, requerido), `id_libro` (FK a Libro, opcional), `id_estado_ejemplar` (FK a EstadoEjemplar, opcional).

**POST /api/ejemplares/** — body de ejemplo:
```json
{
  "codigo_inventario": "INV-00123",
  "ubicacion_estante": "Estante B-4",
  "fecha_adquisicion": "2024-02-15",
  "codigo_barras": "7791234567890",
  "id_libro": 1,
  "id_estado_ejemplar": 1
}
```
Response `201 Created`: el registro creado.

**Errores:** `400` faltan campos requeridos (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorCodigo` (`?codigo=`).

---

## Estados de Ejemplar

Router: `src/routes/RouterEstadosEjemplar.js` · Controller: `src/controllers/ControllerEstadoEjemplar.js` · Modelo: `EstadoEjemplar` (tabla `Estados_Ejemplar`)

Base path: `/api/estados_ejemplar`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estados_ejemplar/` | Lista todos los estados de ejemplar |
| POST | `/api/estados_ejemplar/` | Crea un estado de ejemplar |
| PATCH | `/api/estados_ejemplar/:id` | Edita un estado de ejemplar |
| DELETE | `/api/estados_ejemplar/:id` | Elimina un estado de ejemplar |

Campos: `id_estado_ejemplar` (PK, auto), `nombre_estado` (string, requerido).

**POST /api/estados_ejemplar/** — body de ejemplo:
```json
{ "nombre_estado": "Disponible" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_estado` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Estados de Multa

Router: `src/routes/RouterEstadosMulta.js` · Controller: `src/controllers/ControllerEstadoMulta.js` · Modelo: `EstadoMulta` (tabla `Estados_Multa`)

Base path: `/api/estados_multa`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estados_multa/` | Lista todos los estados de multa |
| POST | `/api/estados_multa/` | Crea un estado de multa |
| PATCH | `/api/estados_multa/:id` | Edita un estado de multa |
| DELETE | `/api/estados_multa/:id` | Elimina un estado de multa |

Campos: `id_estado_multa` (PK, auto), `nombre_estado` (string, requerido).

> Nota: `PATCH /api/multas/:id/pagar` (ver recurso [Multas](#multas)) busca un registro con `nombre_estado = "Pagada"` en esta tabla; debe existir para que esa acción funcione.

**POST /api/estados_multa/** — body de ejemplo:
```json
{ "nombre_estado": "Pendiente" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_estado` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Estados de Préstamo

Router: `src/routes/RouterEstadosPrestamo.js` · Controller: `src/controllers/ControllerEstadoPrestamo.js` · Modelo: `EstadoPrestamo` (tabla `Estados_Prestamo`)

Base path: `/api/estados_prestamo`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estados_prestamo/` | Lista todos los estados de préstamo |
| POST | `/api/estados_prestamo/` | Crea un estado de préstamo |
| PATCH | `/api/estados_prestamo/:id` | Edita un estado de préstamo |
| DELETE | `/api/estados_prestamo/:id` | Elimina un estado de préstamo |

Campos: `id_estado_prestamo` (PK, auto), `nombre_estado` (string, requerido).

> Nota: `PATCH /api/prestamos/:id/devolver` (ver recurso [Préstamos](#préstamos)) busca un registro con `nombre_estado = "Devuelto"` en esta tabla; debe existir para que esa acción funcione.

**POST /api/estados_prestamo/** — body de ejemplo:
```json
{ "nombre_estado": "Activo" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_estado` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Estados de Reserva

Router: `src/routes/RouterEstadosReserva.js` · Controller: `src/controllers/ControllerEstadoReserva.js` · Modelo: `EstadoReserva` (tabla `Estados_Reserva`)

Base path: `/api/estados_reserva`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estados_reserva/` | Lista todos los estados de reserva |
| POST | `/api/estados_reserva/` | Crea un estado de reserva |
| PATCH | `/api/estados_reserva/:id` | Edita un estado de reserva |
| DELETE | `/api/estados_reserva/:id` | Elimina un estado de reserva |

Campos: `id_estado_reserva` (PK, auto), `nombre_estado` (string, requerido).

> Nota: `PATCH /api/reservas/:id/cancelar` (ver recurso [Reservas](#reservas)) busca un registro con `nombre_estado = "Cancelada"` en esta tabla; debe existir para que esa acción funcione.

**POST /api/estados_reserva/** — body de ejemplo:
```json
{ "nombre_estado": "Activa" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_estado` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Estados de Usuario

Router: `src/routes/RouterEstadosUsuario.js` · Controller: `src/controllers/ControllerEstadoUsuario.js` · Modelo: `EstadoUsuario` (tabla `Estados_Usuario`)

Base path: `/api/estados_usuario`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/estados_usuario/` | Lista todos los estados de usuario |
| POST | `/api/estados_usuario/` | Crea un estado de usuario |
| PATCH | `/api/estados_usuario/:id` | Edita un estado de usuario |
| DELETE | `/api/estados_usuario/:id` | Elimina un estado de usuario |

Campos: `id_estado_usuario` (PK, auto), `nombre_estado_usuario` (string, requerido).

**POST /api/estados_usuario/** — body de ejemplo:
```json
{ "nombre_estado_usuario": "Activo" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_estado_usuario` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Idiomas

Router: `src/routes/RouterIdiomas.js` · Controller: `src/controllers/ControllerIdioma.js` · Modelo: `Idioma` (tabla `Idiomas`)

Base path: `/api/idiomas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/idiomas/` | Lista todos los idiomas |
| POST | `/api/idiomas/` | Crea un idioma |
| PATCH | `/api/idiomas/:id` | Edita un idioma |
| DELETE | `/api/idiomas/:id` | Elimina un idioma |

Campos: `id_idioma` (PK, auto), `nombre` (string, requerido).

**POST /api/idiomas/** — body de ejemplo:
```json
{ "nombre": "Español" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Libros

Router: `src/routes/RouterLibros.js` · Controller: `src/controllers/ControllerLibro.js` · Modelo: `Libro` (tabla `Libros`)

Base path: `/api/libros`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/libros/` | Lista todos los libros |
| POST | `/api/libros/` | Crea un libro |
| PATCH | `/api/libros/:id` | Edita un libro |
| DELETE | `/api/libros/:id` | Elimina un libro |
| POST | `/api/libros/:id/autores` | Asocia un autor al libro `:id` |
| POST | `/api/libros/:id/categorias` | Asocia una categoría al libro `:id` |

Campos: `id_libro` (PK, auto), `titulo` (string, requerido), `isbn` (string, requerido), `anio_publicacion` (integer, requerido), `num_paginas` (integer, requerido), `sinopsis` (string, opcional), `id_editorial` (FK, opcional), `id_idioma` (FK, opcional).

**POST /api/libros/** — body de ejemplo:
```json
{
  "titulo": "Cien años de soledad",
  "isbn": "978-0307474728",
  "anio_publicacion": 1967,
  "num_paginas": 471,
  "sinopsis": "La historia de la familia Buendía en Macondo.",
  "id_editorial": 1,
  "id_idioma": 1
}
```
Response `201 Created`: el registro creado.

**POST /api/libros/:id/autores** — body de ejemplo:
```json
{ "id_autor": 1 }
```
Response `201 Created`: la fila creada en la tabla intermedia `Libro_Autor` (`{ id_libro, id_autor }`).

**POST /api/libros/:id/categorias** — body de ejemplo:
```json
{ "id_categoria": 1 }
```
Response `201 Created`: la fila creada en la tabla intermedia `Libro_Categoria` (`{ id_libro, id_categoria }`).

**Errores:**
- `400` — faltan `titulo`, `isbn`, `anio_publicacion` o `num_paginas` al crear/editar el libro; o falta `id_autor`/`id_categoria` al asociar (o error de Sequelize, p. ej. FK inexistente).
- `404` — libro no encontrado al editar/eliminar.
- `500` — error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorTitulo` (`?titulo=`).

---

## Multas

Router: `src/routes/RouterMultas.js` · Controller: `src/controllers/ControllerMulta.js` · Modelo: `Multa` (tabla `Multas`)

Base path: `/api/multas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/multas/` | Lista todas las multas |
| POST | `/api/multas/` | Crea una multa |
| PATCH | `/api/multas/:id` | Edita una multa |
| DELETE | `/api/multas/:id` | Elimina una multa |
| PATCH | `/api/multas/:id/pagar` | Marca la multa como pagada |

Campos: `id_multa` (PK, auto), `monto` (decimal 10,2, requerido), `motivo` (string, requerido), `fecha_generada` (date, requerido), `fecha_pago` (date, opcional), `id_prestamo` (FK, requerido en la validación de creación), `id_estado_multa` (FK, requerido en la validación de creación).

**POST /api/multas/** — body de ejemplo:
```json
{
  "id_prestamo": 1,
  "id_estado_multa": 1,
  "monto": 1500.00,
  "motivo": "Devolución fuera de plazo",
  "fecha_generada": "2026-09-01"
}
```
Response `201 Created`: el registro creado.

**PATCH /api/multas/:id/pagar** — sin body. Busca el `EstadoMulta` con `nombre_estado = "Pagada"`, actualiza `id_estado_multa` y setea `fecha_pago` a la fecha actual.
Response `200 OK`:
```json
{ "mensaje": "Multa pagada correctamente" }
```

**Errores:**
- `400` — faltan `id_prestamo`, `id_estado_multa`, `monto`, `motivo` o `fecha_generada` al crear; error al editar; o al pagar, si no existe el estado `"Pagada"` en `Estados_Multa` o el registro no cambió filas.
- `404` — multa no encontrada al editar/eliminar.
- `500` — error de base de datos al listar/eliminar.

---

## Notificaciones

Router: `src/routes/RouterNotificaciones.js` · Controller: `src/controllers/ControllerNotificacion.js` · Modelo: `Notificacion` (tabla `Notificaciones`)

Base path: `/api/notificaciones`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/notificaciones/` | Lista todas las notificaciones |
| POST | `/api/notificaciones/` | Crea una notificación |
| PATCH | `/api/notificaciones/:id` | Edita una notificación |
| DELETE | `/api/notificaciones/:id` | Elimina una notificación |
| PATCH | `/api/notificaciones/:id/marcar-leida` | Marca la notificación como leída |

Campos: `id_notificacion` (PK, auto), `mensaje` (string, requerido), `referencia_id` (integer, opcional), `tipo_referencia` (string, opcional), `fecha_envio` (datetime, requerido), `leida` (boolean, default `false`), `id_cliente` (FK a Usuario, requerido en la validación de creación), `id_tipo_notificacion` (FK, requerido en la validación de creación).

**POST /api/notificaciones/** — body de ejemplo:
```json
{
  "id_cliente": 1,
  "id_tipo_notificacion": 1,
  "mensaje": "Tu préstamo vence en 2 días",
  "fecha_envio": "2026-09-14T10:00:00.000Z",
  "referencia_id": 5,
  "tipo_referencia": "prestamo"
}
```
Response `201 Created`: el registro creado.

**PATCH /api/notificaciones/:id/marcar-leida** — sin body. Setea `leida: true`.
Response `200 OK`:
```json
{ "mensaje": "Notificación marcada como leída" }
```

**Errores:**
- `400` — faltan `id_cliente`, `id_tipo_notificacion`, `mensaje` o `fecha_envio` al crear; error al editar o al marcar como leída.
- `404` — notificación no encontrada al editar/eliminar/marcar como leída.
- `500` — error de base de datos al listar/eliminar.

_No conectado a ruta:_ `obtenerPorId`.

---

## Países

Router: `src/routes/RouterPaises.js` · Controller: `src/controllers/ControllerPais.js` · Modelo: `Pais` (tabla `Paises`)

Base path: `/api/paises`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/paises/` | Lista todos los países |
| POST | `/api/paises/` | Crea un país |
| PATCH | `/api/paises/:id` | Edita un país |
| DELETE | `/api/paises/:id` | Elimina un país |

Campos: `id_pais` (PK, auto), `nombre_pais` (string, requerido).

**POST /api/paises/** — body de ejemplo:
```json
{ "nombre_pais": "Argentina" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_pais` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Préstamos

Router: `src/routes/RouterPrestamos.js` · Controller: `src/controllers/ControllerPrestamo.js` · Modelo: `Prestamo` (tabla `Prestamos`)

Base path: `/api/prestamos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/prestamos/` | Lista todos los préstamos |
| POST | `/api/prestamos/` | Crea un préstamo |
| PATCH | `/api/prestamos/:id` | Edita un préstamo |
| DELETE | `/api/prestamos/:id` | Elimina un préstamo |
| PATCH | `/api/prestamos/:id/devolver` | Marca el préstamo como devuelto |

Campos: `id_prestamo` (PK, auto), `fecha_prestamo` (date, requerido), `fecha_devolucion_esperada` (date, requerido), `fecha_devolucion_real` (date, opcional), `observaciones` (string, opcional), `id_ejemplar` (FK, requerido en la validación de creación), `id_cliente` (FK a Usuario, requerido en la validación de creación), `id_registrado_por` (FK a Usuario, requerido en la validación de creación), `id_estado_prestamo` (FK, requerido en la validación de creación).

**POST /api/prestamos/** — body de ejemplo:
```json
{
  "id_ejemplar": 1,
  "id_cliente": 2,
  "id_registrado_por": 1,
  "id_estado_prestamo": 1,
  "fecha_prestamo": "2026-09-01",
  "fecha_devolucion_esperada": "2026-09-15",
  "observaciones": "Retirado en mostrador"
}
```
Response `201 Created`: el registro creado.

**PATCH /api/prestamos/:id/devolver** — sin body. Busca el `EstadoPrestamo` con `nombre_estado = "Devuelto"`, actualiza `id_estado_prestamo` y setea `fecha_devolucion_real` a la fecha actual.
Response `200 OK`:
```json
{ "mensaje": "Préstamo devuelto correctamente" }
```

**Errores:**
- `400` — faltan `id_ejemplar`, `id_cliente`, `id_registrado_por`, `id_estado_prestamo`, `fecha_prestamo` o `fecha_devolucion_esperada` al crear; error al editar; o al devolver, si no existe el estado `"Devuelto"` en `Estados_Prestamo` o el registro no cambió filas.
- `404` — préstamo no encontrado al editar/eliminar.
- `500` — error de base de datos al listar/eliminar.

_No conectado a ruta:_ `obtenerPorId`.

---

## Reservas

Router: `src/routes/RouterReservas.js` · Controller: `src/controllers/ControllerReserva.js` · Modelo: `Reserva` (tabla `Reservas`)

Base path: `/api/reservas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reservas/` | Lista todas las reservas |
| POST | `/api/reservas/` | Crea una reserva |
| PATCH | `/api/reservas/:id` | Edita una reserva |
| DELETE | `/api/reservas/:id` | Elimina una reserva |
| PATCH | `/api/reservas/:id/cancelar` | Cancela la reserva |

Campos: `id_reserva` (PK, auto), `fecha_reserva` (date, requerido), `fecha_expiracion` (date, requerido), `id_libro` (FK, requerido en la validación de creación), `id_cliente` (FK a Usuario, requerido en la validación de creación), `id_estado_reserva` (FK, requerido en la validación de creación).

**POST /api/reservas/** — body de ejemplo:
```json
{
  "id_libro": 1,
  "id_cliente": 2,
  "id_estado_reserva": 1,
  "fecha_reserva": "2026-09-14",
  "fecha_expiracion": "2026-09-21"
}
```
Response `201 Created`: el registro creado.

**PATCH /api/reservas/:id/cancelar** — sin body. Busca el `EstadoReserva` con `nombre_estado = "Cancelada"` y actualiza `id_estado_reserva`.
Response `200 OK`:
```json
{ "mensaje": "Reserva cancelada correctamente" }
```

**Errores:**
- `400` — faltan `id_libro`, `id_cliente`, `id_estado_reserva`, `fecha_reserva` o `fecha_expiracion` al crear; error al editar; o al cancelar, si no existe el estado `"Cancelada"` en `Estados_Reserva` o el registro no cambió filas.
- `404` — reserva no encontrada al editar/eliminar.
- `500` — error de base de datos al listar/eliminar.

_No conectado a ruta:_ `obtenerPorId`.

---

## Roles

Router: `src/routes/RouterRoles.js` · Controller: `src/controllers/ControllerRol.js` · Modelo: `Rol` (tabla `Roles`)

Base path: `/api/roles`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/roles/` | Lista todos los roles |
| POST | `/api/roles/` | Crea un rol |
| PATCH | `/api/roles/:id` | Edita un rol |
| DELETE | `/api/roles/:id` | Elimina un rol |

Campos: `id_rol` (PK, auto), `nombre_rol` (string, requerido), `descripcion_rol` (string, requerido).

**POST /api/roles/** — body de ejemplo:
```json
{
  "nombre_rol": "Bibliotecario",
  "descripcion_rol": "Gestiona préstamos, reservas y el catálogo"
}
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre_rol` o `descripcion_rol` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Tipos de Documento

Router: `src/routes/RouterTiposDocumento.js` · Controller: `src/controllers/ControllerTipoDocumento.js` · Modelo: `TipoDocumento` (tabla `Tipos_Documento`)

Base path: `/api/tipos_documento`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/tipos_documento/` | Lista todos los tipos de documento |
| POST | `/api/tipos_documento/` | Crea un tipo de documento |
| PATCH | `/api/tipos_documento/:id` | Edita un tipo de documento |
| DELETE | `/api/tipos_documento/:id` | Elimina un tipo de documento |

Campos: `id_tipo_documento` (PK, auto), `codigo` (string, requerido), `nombre` (string, requerido).

**POST /api/tipos_documento/** — body de ejemplo:
```json
{ "codigo": "DNI", "nombre": "Documento Nacional de Identidad" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `codigo` o `nombre` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorCodigo` (`?codigo=`).

---

## Tipos de Notificación

Router: `src/routes/RouterTiposNotificacion.js` · Controller: `src/controllers/ControllerTipoNotificacion.js` · Modelo: `TipoNotificacion` (tabla `Tipos_Notificacion`)

Base path: `/api/tipos_notificacion`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/tipos_notificacion/` | Lista todos los tipos de notificación |
| POST | `/api/tipos_notificacion/` | Crea un tipo de notificación |
| PATCH | `/api/tipos_notificacion/:id` | Edita un tipo de notificación |
| DELETE | `/api/tipos_notificacion/:id` | Elimina un tipo de notificación |

Campos: `id_tipo_notificacion` (PK, auto), `nombre` (string, requerido).

**POST /api/tipos_notificacion/** — body de ejemplo:
```json
{ "nombre": "Recordatorio de vencimiento" }
```
Response `201 Created`: el registro creado.

**Errores:** `400` falta `nombre` (o error al crear/editar) · `404` no encontrado al editar/eliminar · `500` error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorNombre` (`?nombre=`).

---

## Usuarios

Router: `src/routes/RouterUsuarios.js` · Controller: `src/controllers/ControllerUsuario.js` · Modelo: `Usuario` (tabla `Usuarios`) · Servicio delega en `src/repositories/RepositoryUsuario.js`

Base path: `/api/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios/` | Lista todos los usuarios |
| POST | `/api/usuarios/` | Crea un usuario |
| PATCH | `/api/usuarios/:id` | Edita un usuario |
| DELETE | `/api/usuarios/:id` | Elimina un usuario |

Campos: `id_usuario` (PK, auto), `numero_documento` (string, requerido, único), `nombre` (string, requerido), `segundo_nombre` (string, opcional), `primer_apellido` (string, requerido), `segundo_apellido` (string, opcional), `telefono` (string, requerido), `email` (string, requerido), `direccion` (string, requerido), `fecha_registro` (datetime, requerido), `id_rol` (FK a Rol, opcional), `id_tipo_documento` (FK a TipoDocumento, opcional), `id_estado_cliente` (FK a EstadoUsuario, opcional).

**POST /api/usuarios/** — body de ejemplo:
```json
{
  "numero_documento": "40123456",
  "nombre": "Ana",
  "segundo_nombre": "María",
  "primer_apellido": "Gómez",
  "segundo_apellido": "Pérez",
  "telefono": "+54 9 11 5555-1234",
  "email": "ana.gomez@example.com",
  "direccion": "Av. Siempre Viva 742",
  "fecha_registro": "2026-09-14T00:00:00.000Z",
  "id_rol": 1,
  "id_tipo_documento": 1,
  "id_estado_cliente": 1
}
```
Response `201 Created`: el registro creado.

**Errores:**
- `400` — faltan `numero_documento`, `nombre`, `primer_apellido`, `telefono`, `email`, `direccion` o `fecha_registro` al crear; error al editar (por ejemplo, `numero_documento` duplicado, ya que es `unique`).
- `404` — usuario no encontrado al editar/eliminar.
- `500` — error de base de datos al listar/eliminar.

_No conectado a ruta:_ `buscarPorCorreo` (`?correo=`).
