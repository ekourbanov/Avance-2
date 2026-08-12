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


    console.log(
        "Módulo de Perfil cargado. Endpoint:",
        API_URL
    );

});