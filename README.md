# CRUD de Usuarios

Proyecto desarrollado para la Tarea 3 (Uso de Git y Git Flow) de la asignatura Programación III.

## Descripción

Aplicación CRUD (Crear, Leer, Actualizar, Eliminar) para gestión de usuarios, compuesta por:

- **Backend**: API REST construida con Node.js y Express.
- **Frontend**: Interfaz web con HTML, CSS y JavaScript vanilla.
- **Persistencia**: Archivo `usuarios.json` (sin base de datos externa).

## Estructura del proyecto

```
crud-usuarios-github/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── data/usuarios.json
│   └── routes/usuarios.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## Cómo ejecutar

```bash
cd backend
npm install
npm start
```

El servidor levanta en `http://localhost:3000`. Abrir `frontend/index.html` en el navegador para usar la interfaz.

## Endpoints de la API

| Método | Ruta                | Descripción              |
|--------|---------------------|---------------------------|
| GET    | /api/usuarios        | Listar todos los usuarios |
| GET    | /api/usuarios/:id     | Obtener un usuario        |
| POST   | /api/usuarios        | Crear un usuario          |
| PUT    | /api/usuarios/:id     | Actualizar un usuario     |
| DELETE | /api/usuarios/:id     | Eliminar un usuario       |

## Flujo de trabajo (Git Flow)

Este repositorio fue desarrollado siguiendo la metodología **Git Flow**, utilizando ramas `main`, `develop` y `qa`, junto con ramas `feature/` y `hotfix/` para cada funcionalidad, integradas mediante Pull Requests.
