document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formCarrera");

    const nombre = document.getElementById("nombreCarrera");
    const codigo = document.getElementById("codigoCarrera");
    const grado = document.getElementById("gradoAcademico");
    const creditos = document.getElementById("creditosCarrera");

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        let valido = true;

        if (nombre.value.trim() == "") {

            document.getElementById("errorNombre").textContent = "Debe ingresar el nombre de la carrera.";

            valido = false;

        }

        if (codigo.value.trim() == "") {

            document.getElementById("errorCodigo").textContent = "Debe ingresar el código.";

            valido = false;

        }

        if (grado.value == "") {

            document.getElementById("errorGrado").textContent = "Seleccione un grado académico.";

            valido = false;

        }

        if (creditos.value == "") {

            document.getElementById("errorCreditos").textContent = "Debe ingresar la cantidad de créditos.";

            valido = false;

        }

    });

});