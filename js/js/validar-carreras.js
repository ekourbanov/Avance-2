document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formCarrera");

    const nombre = document.getElementById("nombreCarrera");
    const codigo = document.getElementById("codigoCarrera");
    const grado = document.getElementById("gradoAcademico");
    const creditos = document.getElementById("creditosCarrera");

    const errorNombre = document.getElementById("errorNombre");
    const errorCodigo = document.getElementById("errorCodigo");
    const errorGrado = document.getElementById("errorGrado");
    const errorCreditos = document.getElementById("errorCreditos");

    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{5,60}$/;
    const regexCodigo = /^[A-Z]{4}-\d{3}$/;

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        limpiarErrores();

        let valido = true;
        const cantidadCreditos = Number(creditos.value);

        if (nombre.value.trim() === "") {
            errorNombre.textContent =
                "Debe ingresar el nombre de la carrera.";

            valido = false;
        } else if (!regexNombre.test(nombre.value.trim())) {
            errorNombre.textContent =
                "El nombre debe contener entre 5 y 60 caracteres, únicamente letras y espacios.";

            valido = false;
        }

        if (codigo.value.trim() === "") {
            errorCodigo.textContent =
                "Debe ingresar el código.";

            valido = false;
        } else if (!regexCodigo.test(codigo.value.trim())) {
            errorCodigo.textContent =
                "Formato inválido. Utilice cuatro letras mayúsculas, un guion y tres números. Ejemplo: ISOF-101.";

            valido = false;
        }

        if (grado.value === "") {
            errorGrado.textContent =
                "Seleccione un grado académico.";

            valido = false;
        }

        if (creditos.value === "") {
            errorCreditos.textContent =
                "Debe ingresar la cantidad de créditos.";

            valido = false;
        } else if (
            !Number.isInteger(cantidadCreditos) ||
            cantidadCreditos < 1 ||
            cantidadCreditos > 12
        ) {
            errorCreditos.textContent =
                "Los créditos deben ser un número entero entre 1 y 12.";

            valido = false;
        }

    });

    function mostrarError(campo, elementoError, mensaje) {
        elementoError.textContent = mensaje;
        campo.classList.add("input-con-error");
        campo.setAttribute("aria-invalid", "true");
    }

    function limpiarError(campo, elementoError) {
        elementoError.textContent = "";
        campo.classList.remove("input-con-error");
        campo.removeAttribute("aria-invalid");
    }

    function limpiarErrores() {
        limpiarError(nombre, errorNombre);
        limpiarError(codigo, errorCodigo);
        limpiarError(grado, errorGrado);
        limpiarError(creditos, errorCreditos);
    }

});