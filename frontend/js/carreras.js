// Endpoint de la API REST para carreras
const API_URL = 'http://localhost:3000/carreras';

// Referencias a los elementos del DOM definidos en el HTML
const formCarrera = document.getElementById('formCarrera');
const tbodyCarreras = document.getElementById('tbody-carreras');
const inputNombre = document.getElementById('nombreCarrera');
const inputDescripcion = document.getElementById('descripcionCarrera');

    /**
     * Función para consultar la lista de carreras (GET)
     */
    const obtenerCarreras = async () => {
        try {
            const respuesta = await fetch(API_URL);
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const carreras = await respuesta.json();
            
            // Persistencia temporal en LocalStorage (Requisito de rúbrica para exposición)
            localStorage.setItem('carrerasLocal', JSON.stringify(carreras));
            
            renderizarTabla(carreras);
            
        } catch (error) {
            console.error('Error al obtener las carreras del servidor:', error);
            
            // Fallback: Mostrar datos de LocalStorage si falla la API
            const datosGuardados = JSON.parse(localStorage.getItem('carrerasLocal')) || [];
            if (datosGuardados.length > 0) {
                renderizarTabla(datosGuardados);
                alert('Atención: Sin conexión al servidor. Mostrando datos almacenados localmente.');
            } else {
                alert('No se pudieron cargar las carreras.');
            }
        }
    };

    /**
     * Función auxiliar para pintar las filas en el HTML
     */
    const renderizarTabla = (carreras) => {
        // Limpiamos la tabla antes de inyectar los nuevos registros
        tbodyCarreras.innerHTML = ''; 

        carreras.forEach(carrera => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${carrera.nombre}</td>
                <td>${carrera.descripcion}</td>
            `;
            tbodyCarreras.appendChild(fila);
        });
    };

    /**
     * Función para enviar una nueva carrera al servidor (POST)
     */
    const guardarCarrera = async (evento) => {
        evento.preventDefault(); // Evita que la página se recargue

        // Capturar y limpiar los valores
        const nombre = inputNombre.value.trim();
        const descripcion = inputDescripcion.value.trim();

        // Validación de campos obligatorios 
        if (nombre === '' || descripcion === '') {
            alert('Por favor, complete todos los campos del formulario.');
            return;
        }

        // Estructura JSON exacta esperada por el backend
        const nuevaCarrera = {
            nombre: nombre,
            descripcion: descripcion
        };

        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaCarrera)
            });

            if (respuesta.ok || respuesta.status === 201) {
                // Cumpliendo rúbrica: limpiar formulario, notificar éxito y sincronizar vista
                formCarrera.reset();
                alert('¡Carrera registrada exitosamente!');
                obtenerCarreras(); // Ejecuta GET para refrescar la tabla sin recargar página
            } else {
                throw new Error('El servidor rechazó el guardado');
            }

        } catch (error) {
            console.error('Error al guardar la carrera:', error);
            alert('Ocurrió un error al intentar registrar la carrera. Verifique que el servidor Node.js esté activo.');
        }
    };

    // Event Listeners principales
    // Sincroniza los flujos: obtiene datos al inicio y envía datos al interactuar
    document.addEventListener('DOMContentLoaded', obtenerCarreras);
    formCarrera.addEventListener('submit', guardarCarrera);