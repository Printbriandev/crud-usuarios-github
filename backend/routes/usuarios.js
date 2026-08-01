const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data', 'usuarios.json');

function leerUsuarios() {
  const contenido = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(contenido);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(dataPath, JSON.stringify(usuarios, null, 2), 'utf-8');
}

router.get('/', (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
});

router.get('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === Number(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(usuario);
});

router.post('/', (req, res) => {
  const usuarios = leerUsuarios();
  const { nombre, email, edad, ciudad } = req.body;

  const nuevoId = usuarios.length > 0
    ? Math.max(...usuarios.map(u => u.id)) + 1
    : 1;

  const nuevoUsuario = { id: nuevoId, nombre, email, edad, ciudad };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json(nuevoUsuario);
});

router.put('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { nombre, email, edad, ciudad } = req.body;
  usuarios[index] = { ...usuarios[index], nombre, email, edad, ciudad };
  guardarUsuarios(usuarios);

  res.json(usuarios[index]);
});

router.delete('/:id', (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const eliminado = usuarios.splice(index, 1);
  guardarUsuarios(usuarios);

  res.json(eliminado[0]);
});

module.exports = router;
