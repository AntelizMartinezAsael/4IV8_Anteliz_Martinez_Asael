// Obtener cada uno de los parámetros del formulario y elementos del DOM
const formUsuario = document.getElementById('form-usuario');
const inputId = document.getElementById('id-usuario'); // Corregido para que coincida con el HTML
const inputNombre = document.getElementById('nombre');
const inputFecha = document.getElementById('fecha_nacimiento');
const inputNota = document.getElementById('nota');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const tbodyUsuarios = document.getElementById('tbody-usuarios');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const mensajeCargar = document.getElementById('mensaje-carga');
const mensajeVacio = document.getElementById('mensaje-vacio');

// Elementos para errores
const errorNombre = document.getElementById('error-nombre');
const errorFecha = document.getElementById('error-fecha');
const errorNota = document.getElementById('error-nota'); // Corregida la errata de Document-get

// URL de la API hacia el servidor
const API_URL = '/api/usuarios';

// 1. Cargar usuarios desde el servidor (GET)
async function cargarUsuarios() {
    try {
        mensajeCargar.style.display = 'block';
        tablaUsuarios.style.display = 'none';
        mensajeVacio.style.display = 'none';

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error('Error al cargar usuarios');
        }

        const usuarios = await respuesta.json();
        renderizarTabla(usuarios);

    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los usuarios de la base de datos.');
    } finally {
        mensajeCargar.style.display = 'none';
    }
}

// 2. Renderizar o "pintar" los datos en la tabla HTML
function renderizarTabla(usuarios) {
    tbodyUsuarios.innerHTML = ''; // Limpiamos la tabla antes de rellenar

    if (usuarios.length === 0) {
        mensajeVacio.style.display = 'block';
        tablaUsuarios.style.display = 'none';
        return;
    }

    mensajeVacio.style.display = 'none';
    tablaUsuarios.style.display = 'table';

    usuarios.forEach(usuario => {
        const tr = document.createElement('tr');
        
        // Formatear la fecha para que sea legible (AAAA-MM-DD)
        const fechaFormateada = usuario.fecha_nacimiento ? usuario.fecha_nacimiento.split('T')[0] : '';

        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${fechaFormateada}</td>
            <td>${usuario.nota}</td>
            <td>
                <button class="btn-editar" onclick="prepararEdicion(${usuario.id}, '${usuario.nombre}', '${fechaFormateada}', ${usuario.nota})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            </td>
        `;
        tbodyUsuarios.appendChild(tr);
    });
}

// 3. Guardar o Actualizar Usuario (POST / PUT)
formUsuario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evitamos que la página se recargue

    const id = inputId.value;
    const datosUsuario = {
        nombre: inputNombre.value,
        fecha_nacimiento: inputFecha.value,
        nota: parseFloat(inputNota.value)
    };

    try {
        let respuesta;
        
        if (id) {
            // Si hay un ID en el campo oculto, significa que estamos EDITANDO (PUT)
            respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosUsuario)
            });
        } else {
            // Si no hay ID, significa que es un NUEVO registro (POST)
            respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosUsuario)
            });
        }

        if (!respuesta.ok) throw new Error('Error al procesar la solicitud');

        // Reiniciamos el estado del formulario y recargamos la lista
        resetearFormulario();
        cargarUsuarios();
        alert('Usuario guardado correctamente.');

    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al intentar guardar el usuario.');
    }
});

// 4. Preparar el formulario para editar un registro existente
function prepararEdicion(id, nombre, fecha, nota) {
    formTitulo.textContent = "Editar Usuario";
    inputId.value = id;
    inputNombre.value = nombre;
    inputFecha.value = fecha;
    inputNota.value = nota;
    
    btnCancelar.style.display = 'inline-block';
}

// 5. Eliminar un usuario (DELETE)
async function eliminarUsuario(id) {
    if (!confirm('¿Está seguro de que desea eliminar este usuario?')) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) throw new Error('Error al eliminar');

        cargarUsuarios();
        alert('Usuario eliminado de forma exitosa.');
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo eliminar el usuario.');
    }
}

// 6. Cancelar edición y limpiar campos
function resetearFormulario() {
    formTitulo.textContent = "Agregar Nuevo Usuario";
    formUsuario.reset();
    inputId.value = '';
    btnCancelar.style.display = 'none';
}

btnCancelar.addEventListener('click', resetearFormulario);

// Inicializar cargando los usuarios al abrir la página
cargarUsuarios();