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

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        limpiarErrores();

        let valido = true;
        const cantidadCreditos = Number(creditos.value);

        // Validación del nombre de la carrera
        if (nombre.value.trim() === "") {

            mostrarError(
                nombre,
                errorNombre,
                "Debe ingresar el nombre de la carrera."
            );

            valido = false;

        } else if (!regexNombre.test(nombre.value.trim())) {

            mostrarError(
                nombre,
                errorNombre,
                "El nombre debe contener entre 5 y 60 caracteres, únicamente letras y espacios."
            );

            valido = false;
        }

        // Validación del código
        if (codigo.value.trim() === "") {

            mostrarError(
                codigo,
                errorCodigo,
                "Debe ingresar el código de la carrera."
            );

            valido = false;

        } else if (!regexCodigo.test(codigo.value.trim())) {

            mostrarError(
                codigo,
                errorCodigo,
                "Formato inválido. Utilice cuatro letras mayúsculas, un guion y tres números. Ejemplo: ISOF-101."
            );

            valido = false;
        }

        // Validación del grado académico
        if (grado.value === "") {

            mostrarError(
                grado,
                errorGrado,
                "Debe seleccionar un grado académico."
            );

            valido = false;
        }

        // Validación de la cantidad de créditos
        if (creditos.value.trim() === "") {

            mostrarError(
                creditos,
                errorCreditos,
                "Debe ingresar la cantidad de créditos."
            );

            valido = false;

        } else if (
            !Number.isInteger(cantidadCreditos) ||
            cantidadCreditos < 1 ||
            cantidadCreditos > 12
        ) {

            mostrarError(
                creditos,
                errorCreditos,
                "Los créditos deben ser un número entero entre 1 y 12."
            );

            valido = false;
        }

        // Confirmación cuando todos los datos son válidos
        if (valido) {

            alert(
                "Los datos fueron validados correctamente y están listos para almacenarse."
            );
        }

    });

    function crearobjetoCarrera() {

        return {
            nombre: nombre.value.trim(),;
            codigo: codigo.value.trim(), 
            
        }; 

    }   

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