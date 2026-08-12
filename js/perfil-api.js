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


    // Mostrar los egresados en la tabla

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
                egresado.areaProfesional || "No especificada";


            fila.appendChild(celdaIdentificacion);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaCorreo);
            fila.appendChild(celdaTelefono);
            fila.appendChild(celdaArea);

            listaEgresados.appendChild(fila);

        });


        estadoEgresados.textContent =
            "Total de egresados registrados: " + egresados.length;

    }


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


            // Mostrar los registros obtenidos

            mostrarEgresados(egresados);


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