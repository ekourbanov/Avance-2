document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://localhost:3000/egresados";

    const CLAVE_LOCAL_STORAGE =
        "perfilEgresadoTemporal";


    const formulario =
        document.getElementById("formPerfil");


    // Campos obligatorios

    const identificacion =
        document.getElementById("identificacion");

    const nombreCompleto =
        document.getElementById("nombreCompleto");

    const correoElectronico =
        document.getElementById("correoElectronico");

    const telefono =
        document.getElementById("telefono");

    const fechaRegistro =
        document.getElementById("fechaRegistro");


    // Campos opcionales

    const empresaActual =
        document.getElementById("empresaActual");

    const puestoActual =
        document.getElementById("puestoActual");

    const areaProfesional =
        document.getElementById("areaProfesional");

    const linkedin =
        document.getElementById("linkedin");

    const portafolio =
        document.getElementById("portafolio");


    // Mensajes de error

    const errorIdentificacion =
        document.getElementById("errorIdentificacion");

    const errorNombreCompleto =
        document.getElementById("errorNombreCompleto");

    const errorCorreoElectronico =
        document.getElementById("errorCorreoElectronico");

    const errorTelefono =
        document.getElementById("errorTelefono");

    const errorFechaRegistro =
        document.getElementById("errorFechaRegistro");


    // Tabla de egresados

    const listaEgresados =
        document.getElementById("listaEgresados");

    const estadoEgresados =
        document.getElementById("estadoEgresados");


    // Estado del registro

    const mensajePerfil =
        document.getElementById("mensajePerfil");

    const botonGuardar =
        formulario.querySelector(".boton-guardar");


    // Obtener datos del formulario

    function obtenerDatosEgresado() {

        const egresado = {

            identificacion:
                identificacion.value.trim(),

            nombreCompleto:
                nombreCompleto.value.trim(),

            correoElectronico:
                correoElectronico.value.trim(),

            telefono:
                telefono.value.trim(),

            fechaRegistro:
                fechaRegistro.value,

            empresaActual:
                empresaActual.value.trim(),

            puestoActual:
                puestoActual.value.trim(),

            areaProfesional:
                areaProfesional.value.trim(),

            linkedin:
                linkedin.value.trim(),

            portafolio:
                portafolio.value.trim()

        };

        return egresado;

    }


    // Guardar temporalmente el formulario en LocalStorage

    function guardarBorradorLocal() {

        const datosTemporales =
            obtenerDatosEgresado();

        localStorage.setItem(
            CLAVE_LOCAL_STORAGE,
            JSON.stringify(datosTemporales)
        );

    }


    // Recuperar datos temporales de LocalStorage

    function cargarBorradorLocal() {

        const datosGuardados =
            localStorage.getItem(
                CLAVE_LOCAL_STORAGE
            );


        if (datosGuardados === null) {

            return;

        }


        try {

            const datos =
                JSON.parse(datosGuardados);


            identificacion.value =
                datos.identificacion || "";

            nombreCompleto.value =
                datos.nombreCompleto || "";

            correoElectronico.value =
                datos.correoElectronico || "";

            telefono.value =
                datos.telefono || "";

            fechaRegistro.value =
                datos.fechaRegistro || "";

            empresaActual.value =
                datos.empresaActual || "";

            puestoActual.value =
                datos.puestoActual || "";

            areaProfesional.value =
                datos.areaProfesional || "";

            linkedin.value =
                datos.linkedin || "";

            portafolio.value =
                datos.portafolio || "";


            mensajePerfil.textContent =
                "Se recuperaron datos guardados temporalmente.";


            console.log(
                "Datos temporales recuperados desde LocalStorage."
            );


        } catch (error) {

            console.error(
                "No se pudieron recuperar los datos temporales:",
                error
            );

            localStorage.removeItem(
                CLAVE_LOCAL_STORAGE
            );

        }

    }


    // Eliminar respaldo temporal

    function limpiarBorradorLocal() {

        localStorage.removeItem(
            CLAVE_LOCAL_STORAGE
        );

    }


    // Limpiar errores

    function limpiarErrores() {

        errorIdentificacion.textContent = "";
        errorNombreCompleto.textContent = "";
        errorCorreoElectronico.textContent = "";
        errorTelefono.textContent = "";
        errorFechaRegistro.textContent = "";

    }


    // Validar correo

    function correoValido(correo) {

        const expresionCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return expresionCorreo.test(correo);

    }


    // Validar campos obligatorios

    function validarDatosEgresado(egresado) {

        limpiarErrores();

        let formularioValido = true;


        if (egresado.identificacion === "") {

            errorIdentificacion.textContent =
                "La identificación es obligatoria.";

            formularioValido = false;

        }


        if (egresado.nombreCompleto === "") {

            errorNombreCompleto.textContent =
                "El nombre completo es obligatorio.";

            formularioValido = false;

        }


        if (egresado.correoElectronico === "") {

            errorCorreoElectronico.textContent =
                "El correo electrónico es obligatorio.";

            formularioValido = false;

        } else if (!correoValido(
            egresado.correoElectronico
        )) {

            errorCorreoElectronico.textContent =
                "Ingrese un correo electrónico válido.";

            formularioValido = false;

        }


        if (egresado.telefono === "") {

            errorTelefono.textContent =
                "El teléfono es obligatorio.";

            formularioValido = false;

        }


        if (egresado.fechaRegistro === "") {

            errorFechaRegistro.textContent =
                "La fecha de registro es obligatoria.";

            formularioValido = false;

        }


        return formularioValido;

    }


    // POST - Registrar egresado

    async function registrarEgresado(egresado) {

        const respuesta =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body:
                    JSON.stringify(egresado)

            });


        if (!respuesta.ok) {

            const detalleError =
                await respuesta.text();


            console.error(
                "Respuesta del backend:",
                detalleError
            );


            throw new Error(
                "No se pudo registrar el egresado"
            );

        }


        const egresadoRegistrado =
            await respuesta.json();


        console.log(
            "Egresado registrado correctamente:",
            egresadoRegistrado
        );


        return egresadoRegistrado;

    }


    // Mostrar egresados en la tabla

    function mostrarEgresados(egresados) {

        listaEgresados.innerHTML = "";


        if (egresados.length === 0) {

            estadoEgresados.textContent =
                "No hay egresados registrados.";

            return;

        }


        egresados.forEach(function (egresado) {

            const fila =
                document.createElement("tr");


            const celdaIdentificacion =
                document.createElement("td");

            celdaIdentificacion.textContent =
                egresado.identificacion;


            const celdaNombre =
                document.createElement("td");

            celdaNombre.textContent =
                egresado.nombreCompleto;


            const celdaCorreo =
                document.createElement("td");

            celdaCorreo.textContent =
                egresado.correoElectronico;


            const celdaTelefono =
                document.createElement("td");

            celdaTelefono.textContent =
                egresado.telefono;


            const celdaArea =
                document.createElement("td");

            celdaArea.textContent =
                egresado.areaProfesional ||
                "No especificada";


            fila.appendChild(
                celdaIdentificacion
            );

            fila.appendChild(
                celdaNombre
            );

            fila.appendChild(
                celdaCorreo
            );

            fila.appendChild(
                celdaTelefono
            );

            fila.appendChild(
                celdaArea
            );


            listaEgresados.appendChild(
                fila
            );

        });


        estadoEgresados.textContent =
            "Total de egresados registrados: "
            + egresados.length;

    }


    // GET - Consultar egresados

    async function consultarEgresados() {

        estadoEgresados.textContent =
            "Consultando egresados...";


        try {

            const respuesta =
                await fetch(API_URL);


            if (!respuesta.ok) {

                throw new Error(
                    "No se pudieron obtener los egresados"
                );

            }


            const egresados =
                await respuesta.json();


            console.log(
                "Egresados obtenidos:",
                egresados
            );


            mostrarEgresados(
                egresados
            );


        } catch (error) {

            console.error(
                "Error al consultar egresados:",
                error
            );


            estadoEgresados.textContent =
                "No se pudieron cargar los egresados.";

        }

    }


    // Guardar temporalmente mientras el usuario escribe

    formulario.addEventListener(
        "input",
        function () {

            guardarBorradorLocal();

        }
    );


    // Enviar formulario

    formulario.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            mensajePerfil.textContent = "";


            const datosEgresado =
                obtenerDatosEgresado();


            const datosValidos =
                validarDatosEgresado(
                    datosEgresado
                );


            if (!datosValidos) {

                mensajePerfil.textContent =
                    "Revise los campos obligatorios.";


                console.warn(
                    "El formulario contiene errores."
                );

                return;

            }


            console.log(
                "Datos validados correctamente:",
                datosEgresado
            );


            mensajePerfil.textContent =
                "Guardando egresado...";


            botonGuardar.disabled = true;


            try {

                await registrarEgresado(
                    datosEgresado
                );


                // Limpiar formulario

                formulario.reset();

                limpiarErrores();


                // Eliminar datos temporales

                limpiarBorradorLocal();


                // Actualizar lista mediante GET

                await consultarEgresados();


                mensajePerfil.textContent =
                    "Egresado registrado correctamente.";


                identificacion.focus();


            } catch (error) {

                console.error(
                    "Error al registrar egresado:",
                    error
                );


                mensajePerfil.textContent =
                    "No se pudo registrar el egresado. Intente nuevamente.";


            } finally {

                botonGuardar.disabled = false;

            }

        }
    );


    console.log(
        "Módulo de Perfil cargado. Endpoint:",
        API_URL
    );


    // Recuperar información temporal

    cargarBorradorLocal();


    // Ejecutar GET al abrir la página

    consultarEgresados();

});