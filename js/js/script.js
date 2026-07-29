document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // LOGIN
    // ==========================

    const formLogin = document.getElementById("formLogin");

    if (formLogin) {

        formLogin.addEventListener("submit", function (e) {

            e.preventDefault();

            const correo = document.getElementById("correo");
            const password = document.getElementById("password");

            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (correo.value.trim() === "") {

                alert("Debe ingresar el correo.");
                correo.focus();
                return;

            }

            if (!regexCorreo.test(correo.value)) {

                alert("Correo electrónico inválido.");
                correo.focus();
                return;

            }

            if (password.value.length < 6) {

                alert("La contraseña debe tener al menos 6 caracteres.");
                password.focus();
                return;

            }

            alert("Inicio de sesión correcto.");

            window.location.href = "perfil.html";

        });

    }

    // ==========================
    // PERFIL
    // ==========================

    const formPerfil = document.getElementById("formPerfil");

    if (formPerfil) {

        formPerfil.addEventListener("submit", function (e) {

            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();

            const correo = document.getElementById("correo").value.trim();

            const telefono = document.getElementById("telefono").value.trim();

            if (nombre === "") {

                alert("Ingrese el nombre.");
                return;

            }

            if (correo === "") {

                alert("Ingrese el correo.");
                return;

            }

            if (telefono === "") {

                alert("Ingrese el teléfono.");
                return;

            }

            alert("Perfil actualizado correctamente.");

        });

    }

    // ==========================
    // EGRESADOS
    // ==========================

    const formEgresado = document.getElementById("formEgresado");

    if (formEgresado) {

        formEgresado.addEventListener("submit", function (e) {

            e.preventDefault();

            const cedula = document.getElementById("cedula").value.trim();

            const nombre = document.getElementById("nombre").value.trim();

            const correo = document.getElementById("correo").value.trim();

            if (cedula === "") {

                alert("Ingrese la cédula.");
                return;

            }

            if (nombre === "") {

                alert("Ingrese el nombre.");
                return;

            }

            if (correo === "") {

                alert("Ingrese el correo.");
                return;

            }

            alert("Egresado registrado correctamente.");

            formEgresado.reset();

        });

    }

    // ==========================
    // TITULOS
    // ==========================

    const formTitulo = document.getElementById("formTitulo");

    if (formTitulo) {

        formTitulo.addEventListener("submit", function (e) {

            e.preventDefault();

            const titulo = document.getElementById("titulo").value.trim();

            const codigo = document.getElementById("codigo").value.trim();

            if (titulo === "") {

                alert("Ingrese el nombre del título.");
                return;

            }

            if (codigo === "") {

                alert("Ingrese el código.");
                return;

            }

            alert("Título registrado correctamente.");

            formTitulo.reset();

        });

    }

    // ==========================
    // BOTONES
    // ==========================

    const botones = document.querySelectorAll("button");

    botones.forEach(function (boton) {

        boton.addEventListener("mouseover", function () {

            boton.style.opacity = "0.9";

        });

        boton.addEventListener("mouseout", function () {

            boton.style.opacity = "1";

        });

    });

    // ==========================
    // TABLAS
    // ==========================

    const filas = document.querySelectorAll("tbody tr");

    filas.forEach(function (fila) {

        fila.addEventListener("click", function () {

            alert("Registro seleccionado.");

        });

    });

});