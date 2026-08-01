const API_URL = 'http://localhost:3000/api/usuarios';

const form = document.getElementById('form-usuario');
const inputId = document.getElementById('usuario-id');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputEdad = document.getElementById('edad');
const inputCiudad = document.getElementById('ciudad');
const btnSubmit = document.getElementById('btn-submit');
const btnCancelar = document.getElementById('btn-cancelar');
const cuerpoTabla = document.getElementById('cuerpo-tabla');

async function cargarUsuarios() {
  const res = await fetch(API_URL);
  const usuarios = await res.json();

  cuerpoTabla.innerHTML = '';
  usuarios.forEach(usuario => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.edad}</td>
      <td>${usuario.ciudad}</td>
      <td>
        <button class="editar" data-id="${usuario.id}">Editar</button>
        <button class="eliminar" data-id="${usuario.id}">Eliminar</button>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: inputNombre.value,
    email: inputEmail.value,
    edad: Number(inputEdad.value),
    ciudad: inputCiudad.value
  };

  if (inputId.value) {
    await fetch(`${API_URL}/${inputId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });
  }

  resetearFormulario();
  cargarUsuarios();
});

cuerpoTabla.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('eliminar')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarUsuarios();
  }

  if (e.target.classList.contains('editar')) {
    const res = await fetch(`${API_URL}/${id}`);
    const usuario = await res.json();

    inputId.value = usuario.id;
    inputNombre.value = usuario.nombre;
    inputEmail.value = usuario.email;
    inputEdad.value = usuario.edad;
    inputCiudad.value = usuario.ciudad;

    btnSubmit.textContent = 'Actualizar usuario';
    btnCancelar.style.display = 'inline-block';
  }
});

btnCancelar.addEventListener('click', resetearFormulario);

function resetearFormulario() {
  form.reset();
  inputId.value = '';
  btnSubmit.textContent = 'Agregar usuario';
  btnCancelar.style.display = 'none';
}

cargarUsuarios();
