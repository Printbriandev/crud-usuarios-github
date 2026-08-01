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

function validarFormulario(usuario) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!usuario.nombre.trim()) {
    return 'El nombre es obligatorio';
  }
  if (!emailRegex.test(usuario.email)) {
    return 'El email no tiene un formato valido';
  }
  if (!usuario.edad || usuario.edad <= 0) {
    return 'La edad debe ser mayor a 0';
  }
  if (!usuario.ciudad.trim()) {
    return 'La ciudad es obligatoria';
  }
  return null;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: inputNombre.value,
    email: inputEmail.value,
    edad: Number(inputEdad.value),
    ciudad: inputCiudad.value
  };

  const errorValidacion = validarFormulario(usuario);
  if (errorValidacion) {
    alert(errorValidacion);
    return;
  }

  const esEdicion = Boolean(inputId.value);
  const url = esEdicion ? `${API_URL}/${inputId.value}` : API_URL;
  const metodo = esEdicion ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.error || 'Ocurrio un error al guardar el usuario');
    return;
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
