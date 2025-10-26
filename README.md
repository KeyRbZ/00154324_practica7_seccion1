# Práctica 7 - Autenticación React + Express
#### Carnet: 00154324
#### Sección: 1


## Respuestas a preguntas

### 1. ¿Cuál es la diferencia entre autenticación y autorización?

**Autenticación** es el proceso de verificar la identidad de un usuario (¿quién eres?).  
**Autorización** es el proceso de determinar qué permisos tiene un usuario autenticado (¿qué puedes hacer?).

**Ejemplo en esta práctica:**
- **Autenticación:** Login con email y contraseña → El sistema verifica quien va a ingresar.
- **Autorización:** Acceder a `/api/auth/profile` → El token JWT verifica quien tiene permiso para ver esta ruta protegida

### 2. ¿Cuál es la función del token JWT en la guía?

El token JWT (JSON Web Token) funciona como un **pase de acceso seguro** que:

1. **Almacena información del usuario** de forma segura y compacta
2. **Verifica la identidad** en cada petición sin necesidad de volver a login
3. **Protege rutas** - solo usuarios con token válido pueden acceder a ciertos endpoints
4. **Mantiene la sesión** entre el frontend y backend de forma stateless

-----------------------------------------------------------------------------------------------
## Descripción
Sistema de autenticación con arquitectura headless usando React (Frontend) y Express (Backend).

## Tecnologías
- Frontend: React, Axios
- Backend: Express, JWT, bcryptjs
- Autenticación: JSON Web Tokens (JWT)

## Instalación y ejecución
1. Backend: `cd Server-BE && npm install && npm run dev`
2. Frontend: `cd cliente-fe && npm install && npm start`


