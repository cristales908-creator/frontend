# Hospital System Frontend

Interfaz web estática en HTML, CSS y JavaScript: inicio de sesión, registro y panel hospitalario.

## Desarrollo local

En la estructura de desarrollo compartida, el backend sirve estas páginas en `http://localhost:3000`. Inicia el backend desde su carpeta con `npm start`.

## Repositorio y despliegue independiente

Este frontend usa rutas relativas `/api/...`, por lo que funciona cuando frontend y API comparten origen o cuando un proxy redirige `/api` al backend. Si publicas el frontend en GitHub Pages u otro dominio independiente, configura un proxy o una URL base para la API y permite ese origen en CORS antes de desplegar.

No pongas `STAFF_REGISTRATION_KEY`, contraseñas ni secretos del backend en este repositorio.