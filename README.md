# Booker

Sistema de gestión de biblioteca. API REST hecha en Node.js (Express + Sequelize + MySQL) para administrar usuarios, libros, autores, ejemplares, préstamos, reservas, multas y notificaciones.

## Instalación

```bash
npm install
```

Configurar la conexión a MySQL en `src/config/creedentials.js` (nombre de base de datos, usuario, contraseña y opciones de conexión que consume `src/config/database.js`).

## Cómo correr el proyecto

```bash
npm run dev
```

Levanta el servidor con `nodemon` en `http://localhost:3000`. Al arrancar, Sequelize se autentica contra la base y sincroniza los modelos (`conn.sync({ alter: true })`).

Otros scripts disponibles (`package.json`):
- `npm run lint` — corre ESLint sobre el proyecto.

## Documentación de la API

Ver [docs/API.md](docs/API.md) para el detalle de cada recurso: endpoints, bodies de ejemplo, respuestas y códigos de error.

## Trabajo colaborativo

El equipo trabajó con **forks individuales**, no con Pull Requests de GitHub. El flujo real fue:

1. Cada integrante forkeó el repositorio y desarrolló su parte en su propio fork.
2. Cuando alguien terminaba su parte, el dueño del repo (sobre su rama local) agregaba el fork de ese integrante como remoto y traía sus cambios:
   ```bash
   git remote add <nombre> <url-del-fork>
   git fetch <nombre>
   ```
3. El dueño corregía nombres y detalles menores sobre esa rama traída.
4. Finalmente mergeaba esa rama a `develop`.

Esto se puede verificar corriendo `git remote -v` y `git branch -a` en la raíz del proyecto. Evidencia concreta en este repo:

- Remotos agregados: `cristian`, `hartur`, `samuel` (cada uno apuntando al fork de ese integrante).
- Ramas traídas de esos forks, entre otras:
  - `remotes/cristian/feature/Repository`
  - `remotes/hartur/feature/controllers`
  - `remotes/samuel/feature/servicios`

## Estructura del proyecto

- `index.js` — punto de entrada del servidor Express.
- `src/config/` — conexión a la base de datos.
- `src/models/` — modelos Sequelize y relaciones (`relaciones.js`).
- `src/repositories/`, `src/services/` — acceso a datos y lógica de negocio.
- `src/controllers/`, `src/routes/` — capa HTTP de la API (ver [docs/API.md](docs/API.md)).
