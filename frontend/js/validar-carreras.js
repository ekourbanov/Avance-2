document.addEventListener("DOMContentLoaded", function () {

    const API_URL =
        "http://localhost:3000/carreras";


    // ============================
    // ELEMENTOS DEL HTML
    // ============================

    const formCarrera =
        document.getElementById("formCarrera");

    const tbodyCarreras =
        document.getElementById("tbody-carreras");

    const inputNombre =
        document.getElementById("nombreCarrera");

    const inputDescripcion =
        document.getElementById("descripcionCarrera");

    const errorNombre =
        document.getElementById("errorNombre");

    const errorDescripcion =
        document.getElementById("errorDescripcion");


    // Verificación básica

    if (
        !formCarrera ||
        !tbodyCarreras ||
        !inputNombre ||
        !inputDescripcion ||
        !errorNombre ||
        !errorDescripcion
    ) {

        console.error(
            "No se encontraron todos los elementos necesarios para Gestión de Carreras."
        );

        return;
    }


    // ============================
    // LIMPIAR ERRORES
    // ============================

    function limpiarErrores() {

        errorNombre.textContent = "";
        errorDescripcion.textContent = "";

        inputNombre.classList.remove(
            "input-con-error"
        );

        inputDescripcion.classList.remove(
            "input-con-error"
        );

    }


    // ============================
    // VALIDACIONES
    // ============================

    function validarFormulario() {

        limpiarErrores();

        let formularioValido = true;


        const nombre =
            inputNombre.value.trim();

        const descripcion =
            inputDescripcion.value.trim();


        if (nombre === "") {

            errorNombre.textContent =
                "El nombre de la carrera es obligatorio.";

            inputNombre.classList.add(
                "input-con-error"
            );

            formularioValido = false;

        }


        if (descripcion === "") {

            errorDescripcion.textContent =
                "La descripción es obligatoria.";

            inputDescripcion.classList.add(
                "input-con-error"
            );

            formularioValido = false;

        }


        return formularioValido;

    }


    // ============================
    // MOSTRAR CARRERAS EN TABLA
    // ============================

    function renderizarTabla(carreras) {

        tbodyCarreras.innerHTML = "";


        if (carreras.length === 0) {

            const fila =
                document.createElement("tr");

            const celda =
                document.createElement("td");

            celda.colSpan = 2;

            celda.textContent =
                "No hay carreras registradas.";

            fila.appendChild(celda);

            tbodyCarreras.appendChild(fila);

            return;

        }


        carreras.forEach(function (carrera) {

            const fila =
                document.createElement("tr");


            const celdaNombre =
                document.createElement("td");

            celdaNombre.textContent =
                carrera.nombre;


            const celdaDescripcion =
                document.createElement("td");

            celdaDescripcion.textContent =
                carrera.descripcion;


            fila.appendChild(
                celdaNombre
            );

            fila.appendChild(
                celdaDescripcion
            );


            tbodyCarreras.appendChild(
                fila
            );

        });

    }


    // ============================
    // GET CARRERAS
    // ============================

    async function obtenerCarreras() {

        try {

            const respuesta =
                await fetch(API_URL);


            if (!respuesta.ok) {

                throw new Error(
                    `Error HTTP: ${respuesta.status}`
                );

            }


            const carreras =
                await respuesta.json();


            console.log(
                "Carreras obtenidas:",
                carreras
            );


            // Persistencia temporal
            localStorage.setItem(
                "carrerasLocal",
                JSON.stringify(carreras)
            );


            renderizarTabla(
                carreras
            );


        } catch (error) {

            console.error(
                "Error al obtener las carreras:",
                error
            );


            // Intentar recuperar datos temporales
            const datosGuardados =
                localStorage.getItem(
                    "carrerasLocal"
                );


            if (datosGuardados) {

                try {

                    const carrerasLocales =
                        JSON.parse(
                            datosGuardados
                        );


                    renderizarTabla(
                        carrerasLocales
                    );


                    console.warn(
                        "Se muestran datos temporales de LocalStorage."
                    );


                } catch (errorLocal) {

                    console.error(
                        "Error al recuperar LocalStorage:",
                        errorLocal
                    );

                }

            }

        }

    }


    // ============================
    // POST CARRERA
    // ============================

    async function guardarCarrera(evento) {

        evento.preventDefault();


        const formularioValido =
            validarFormulario();


        if (!formularioValido) {

            console.warn(
                "El formulario contiene errores."
            );

            return;

        }


        const nuevaCarrera = {

            nombre:
                inputNombre.value.trim(),

            descripcion:
                inputDescripcion.value.trim()

        };


        console.log(
            "Datos que se enviarán:",
            nuevaCarrera
        );


        try {

            const respuesta =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                nuevaCarrera
                            )

                    }
                );


            if (!respuesta.ok) {

                const detalleError =
                    await respuesta.text();


                console.error(
                    "Respuesta del backend:",
                    detalleError
                );


                throw new Error(
                    `Error HTTP: ${respuesta.status}`
                );

            }


            const carreraRegistrada =
                await respuesta.json();


            console.log(
                "Carrera registrada:",
                carreraRegistrada
            );


            // Limpiar formulario
            formCarrera.reset();

            limpiarErrores();


            // Actualizar automáticamente
            // la tabla mediante GET

            await obtenerCarreras();


            alert(
                "¡Carrera registrada exitosamente!"
            );


        } catch (error) {

            console.error(
                "Error al guardar la carrera:",
                error
            );


            alert(
                "No se pudo registrar la carrera. Verifique que el servidor esté activo."
            );

        }

    }


    // ============================
    // LIMPIAR ERRORES AL ESCRIBIR
    // ============================

    inputNombre.addEventListener(
        "input",
        function () {

            errorNombre.textContent = "";

            inputNombre.classList.remove(
                "input-con-error"
            );

        }
    );


    inputDescripcion.addEventListener(
        "input",
        function () {

            errorDescripcion.textContent = "";

            inputDescripcion.classList.remove(
                "input-con-error"
            );

        }
    );


    // ============================
    // EVENTO DEL FORMULARIO
    // ============================

    formCarrera.addEventListener(
        "submit",
        guardarCarrera
    );


    // ============================
    // GET AL CARGAR LA PÁGINA
    // ============================

    obtenerCarreras();

});