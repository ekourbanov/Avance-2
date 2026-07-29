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

    const regexNombre =
        /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{5,60}$/;

    const regexCodigo =
        /^[A-Z]{4}-\d{3}$/;

    // Clave que se utilizará para guardar las carreras.
    const CLAVE_CARRERAS = "carreras";

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        limpiarErrores();

        let valido = true;

        const cantidadCreditos =
            Number(creditos.value);

        const codigoNormalizado =
            codigo.value.trim().toUpperCase();

        // Validación del nombre
        if (nombre.value.trim() === "") {

            mostrarError(
                nombre,
                errorNombre,
                "Debe ingresar el nombre de la carrera."
            );

            valido = false;

        } else if (
            !regexNombre.test(nombre.value.trim())
        ) {

            mostrarError(
                nombre,
                errorNombre,
                "El nombre debe contener entre 5 y 60 caracteres, únicamente letras y espacios."
            );

            valido = false;
        }

        // Validación del código
        if (codigoNormalizado === "") {

            mostrarError(
                codigo,
                errorCodigo,
                "Debe ingresar el código de la carrera."
            );

            valido = false;

        } else if (
            !regexCodigo.test(codigoNormalizado)
        ) {

            mostrarError(
                codigo,
                errorCodigo,
                "Formato inválido. Ejemplo: ISOF-101."
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

        // Validación de los créditos
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

        if (valido) {

            const carrera =
                crearObjetoCarrera();

            console.log(
                "Objeto carrera creado:",
                carrera
            );

            console.log(
                "Carreras existentes:",
                obtenerCarreras()
            );

            alert(
                "El objeto carrera fue creado correctamente."
            );
        }

    });

    function crearObjetoCarrera() {

        return {

            id: Date.now(),

            nombre:
                nombre.value.trim(),

            codigo:
                codigo.value.trim().toUpperCase(),

            grado:
                grado.value,

            creditos:
                Number(creditos.value),

            fechaRegistro:
                new Date().toISOString()

        };
    }

    // Recupera el arreglo de carreras de Local Storage.
    function obtenerCarreras() {

        const registros =
            localStorage.getItem(CLAVE_CARRERAS);

        // Si todavía no existen registros,
        // devuelve un arreglo vacío.
        if (registros === null) {

            return [];
        }

        const carreras =
            JSON.parse(registros);

        // Verifica que lo recuperado sea un arreglo.
        if (Array.isArray(carreras)) {

            return carreras;
        }

        return [];
    }

    // Guarda el arreglo completo de carreras
    // dentro de Local Storage.
    function guardarCarreras(carreras) {

        localStorage.setItem(
            CLAVE_CARRERAS,
            JSON.stringify(carreras)
        );
    }

    function mostrarError(
        campo,
        elementoError,
        mensaje
    ) {

        elementoError.textContent =
            mensaje;

        campo.classList.add(
            "input-con-error"
        );

        campo.setAttribute(
            "aria-invalid",
            "true"
        );
    }

    function limpiarError(
        campo,
        elementoError
    ) {

        elementoError.textContent = "";

        campo.classList.remove(
            "input-con-error"
        );

        campo.removeAttribute(
            "aria-invalid"
        );
    }

    function limpiarErrores() {

        limpiarError(
            nombre,
            errorNombre
        );

        limpiarError(
            codigo,
            errorCodigo
        );

        limpiarError(
            grado,
            errorGrado
        );

        limpiarError(
            creditos,
            errorCreditos
        );
    }

});