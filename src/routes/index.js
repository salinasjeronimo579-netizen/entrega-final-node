import { Router } from "express";

import { router_rol } from "./RouterRoles.js";
import { router_tipo_documento } from "./RouterTiposDocumento.js";
import { router_estado_usuario } from "./RouterEstadosUsuario.js";
import { router_usuario } from "./RouterUsuarios.js";
import { router_pais } from "./RouterPaises.js";
import { router_editorial } from "./RouterEditoriales.js";
import { router_idioma } from "./RouterIdiomas.js";
import { router_libro } from "./RouterLibros.js";
import { router_autor } from "./RouterAutores.js";
import { router_categoria } from "./RouterCategorias.js";
import { router_estado_ejemplar } from "./RouterEstadosEjemplar.js";
import { router_ejemplar } from "./RouterEjemplares.js";
import { router_estado_prestamo } from "./RouterEstadosPrestamo.js";
import { router_prestamo } from "./RouterPrestamos.js";
import { router_estado_reserva } from "./RouterEstadosReserva.js";
import { router_reserva } from "./RouterReservas.js";
import { router_estado_multa } from "./RouterEstadosMulta.js";
import { router_multa } from "./RouterMultas.js";
import { router_tipo_notificacion } from "./RouterTiposNotificacion.js";
import { router_notificacion } from "./RouterNotificaciones.js";

const router = Router();

router.use(router_rol);
router.use(router_tipo_documento);
router.use(router_estado_usuario);
router.use(router_usuario);
router.use(router_pais);
router.use(router_editorial);
router.use(router_idioma);
router.use(router_libro);
router.use(router_autor);
router.use(router_categoria);
router.use(router_estado_ejemplar);
router.use(router_ejemplar);
router.use(router_estado_prestamo);
router.use(router_prestamo);
router.use(router_estado_reserva);
router.use(router_reserva);
router.use(router_estado_multa);
router.use(router_multa);
router.use(router_tipo_notificacion);
router.use(router_notificacion);

export { router };