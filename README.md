# Hospital System Frontend

Interfaz web estática en HTML, CSS y JavaScript: inicio de sesión, registro y panel hospitalario.

## Desarrollo local

En la estructura de desarrollo compartida, el backend sirve estas páginas en `http://localhost:3000`. Inicia el backend desde su carpeta con `npm start`.

## Repositorio y despliegue independiente

Este frontend usa rutas relativas `/api/...`. El archivo `vercel.json` configura Vercel para reenviar esas rutas al backend de Render, incluyendo login, registro y las operaciones del panel.

Para desplegarlo, conecta el repositorio `frontend` a Vercel y usa la carpeta raíz del repositorio como **Root Directory**. Después de subir `vercel.json`, crea un nuevo despliegue. No hace falta configurar CORS para estas llamadas, ya que el navegador se comunica con Vercel y Vercel las reenvía al backend.

Si cambia el dominio público del backend, actualiza el destino `https://backend-5uw8.onrender.com/api/:path*` en `vercel.json` y vuelve a desplegar.

También se puede publicar como **Static Site** en Render desde el repositorio `frontend`: usa `.` como **Publish Directory** y deja vacío el comando de compilación. En páginas alojadas en `*.onrender.com`, el navegador llama directamente a `https://backend-5uw8.onrender.com`; el backend ya permite solicitudes CORS. Si cambia el dominio público del backend, actualiza `API_BASE` en `login.html`, `registro.html` e `index.html`.

No pongas `STAFF_REGISTRATION_KEY`, contraseñas ni secretos del backend en este repositorio.