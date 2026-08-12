document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://localhost:3000/egresados";

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


    // Elementos para mostrar los registros del GET

    const listaEgresados =
        document.getElementById("listaEgresados");

    const estadoEgresados =
        document.getElementById("estadoEgresados");


    // Consultar egresados registrados en la API

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

            estadoEgresados.textContent =
                "Egresados obtenidos correctamente.";

        } catch (error) {

            console.error(
                "Error al consultar egresados:",
                error
            );

            estadoEgresados.textContent =
                "No se pudieron cargar los egresados.";

        }

    }


    console.log(
        "Módulo de Perfil cargado. Endpoint:",
        API_URL
    );


    // Ejecutar GET al cargar la página

    consultarEgresados();

});