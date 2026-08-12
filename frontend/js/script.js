document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // LOGIN
    // ==========================

    const formLogin =
        document.getElementById("formLogin");

    if (formLogin) {

        const correo =
            document.getElementById("correo");

        const password =
            document.getElementById("password");

        const errorCorreo =
            document.getElementById("errorCorreo");

        const errorPassword =
            document.getElementById("errorPassword");


        // Crear mensaje visual del login

        let mensajeLogin =
            document.getElementById("mensajeLogin");

        if (!mensajeLogin) {

            mensajeLogin =
                document.createElement("div");

            mensajeLogin.id = "mensajeLogin";

            mensajeLogin.className =
                "mensaje-login oculto";


            const acciones =
                formLogin.querySelector(
                    ".acciones-formulario"
                );


            const links =
                formLogin.querySelector(
                    ".links-login"
                );


            if (acciones && links) {

                formLogin.insertBefore(
                    mensajeLogin,
                    links
                );

            } else {

                formLogin.appendChild(
                    mensajeLogin
                );

            }

        }


        function mostrarMensajeLogin(
            mensaje,
            tipo
        ) {

            mensajeLogin.textContent = "";

            mensajeLogin.className =
                "mensaje-login " + tipo;


            const icono =
                document.createElement("span");

            icono.className =
                "icono-mensaje";


            if (tipo === "exito") {

                icono.textContent = "✓";

            } else {

                icono.textContent = "!";

            }


            const texto =
                document.createElement("span");

            texto.textContent = mensaje;


            mensajeLogin.appendChild(
                icono
            );

            mensajeLogin.appendChild(
                texto
            );

        }


        function ocultarMensajeLogin() {

            mensajeLogin.className =
                "mensaje-login oculto";

            mensajeLogin.textContent = "";

        }


        function limpiarErroresLogin() {

            errorCorreo.textContent = "";
            errorPassword.textContent = "";

            correo.classList.remove(
                "input-con-error"
            );

            password.classList.remove(
                "input-con-error"
            );

        }


        // Quitar error mientras el usuario escribe

        correo.addEventListener(
            "input",
            function () {

                errorCorreo.textContent = "";

                correo.classList.remove(
                    "input-con-error"
                );

                ocultarMensajeLogin();

            }
        );


        password.addEventListener(
            "input",
            function () {

                errorPassword.textContent = "";

                password.classList.remove(
                    "input-con-error"
                );

                ocultarMensajeLogin();

            }
        );


        formLogin.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                limpiarErroresLogin();

                ocultarMensajeLogin();


                const correoIngresado =
                    correo.value.trim();

                const passwordIngresado =
                    password.value;


                const regexCorreo =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                // Validar correo vacío

                if (correoIngresado === "") {

                    errorCorreo.textContent =
                        "Debe ingresar el correo electrónico.";

                    correo.classList.add(
                        "input-con-error"
                    );

                    mostrarMensajeLogin(
                        "Revise los datos ingresados.",
                        "error"
                    );

                    correo.focus();

                    return;

                }


                // Validar formato del correo

                if (!regexCorreo.test(
                    correoIngresado
                )) {

                    errorCorreo.textContent =
                        "Ingrese un correo electrónico válido.";

                    correo.classList.add(
                        "input-con-error"
                    );

                    mostrarMensajeLogin(
                        "El correo electrónico no tiene un formato válido.",
                        "error"
                    );

                    correo.focus();

                    return;

                }


                // Validar contraseña vacía

                if (passwordIngresado === "") {

                    errorPassword.textContent =
                        "Debe ingresar la contraseña.";

                    password.classList.add(
                        "input-con-error"
                    );

                    mostrarMensajeLogin(
                        "Debe ingresar su contraseña.",
                        "error"
                    );

                    password.focus();

                    return;

                }


                // Validar longitud de contraseña

                if (passwordIngresado.length < 6) {

                    errorPassword.textContent =
                        "La contraseña debe tener al menos 6 caracteres.";

                    password.classList.add(
                        "input-con-error"
                    );

                    mostrarMensajeLogin(
                        "La contraseña ingresada es demasiado corta.",
                        "error"
                    );

                    password.focus();

                    return;

                }


                // Login correcto

                mostrarMensajeLogin(
                    "Inicio de sesión correcto. Redirigiendo...",
                    "exito"
                );


                const botonIngresar =
                    formLogin.querySelector(
                        ".boton-guardar"
                    );


                if (botonIngresar) {

                    botonIngresar.disabled = true;

                    botonIngresar.textContent =
                        "Ingresando...";

                }


                // Pequeña espera para que se vea
                // el mensaje antes de cambiar de página

                setTimeout(
                    function () {

                        window.location.href =
                            "perfil.html";

                    },
                    1000
                );

            }
        );

    }


    // ==========================
    // PERFIL
    // ==========================

    const formPerfil =
        document.getElementById("formPerfil");

    if (formPerfil) {

        formPerfil.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const nombreElemento =
                    document.getElementById("nombre");

                const correoElemento =
                    document.getElementById("correo");

                const telefonoElemento =
                    document.getElementById("telefono");


                // Evitar errores si esta página
                // utiliza otros IDs

                if (
                    !nombreElemento ||
                    !correoElemento ||
                    !telefonoElemento
                ) {

                    return;

                }


                const nombre =
                    nombreElemento.value.trim();

                const correo =
                    correoElemento.value.trim();

                const telefono =
                    telefonoElemento.value.trim();


                if (nombre === "") {

                    alert(
                        "Ingrese el nombre."
                    );

                    return;

                }


                if (correo === "") {

                    alert(
                        "Ingrese el correo."
                    );

                    return;

                }


                if (telefono === "") {

                    alert(
                        "Ingrese el teléfono."
                    );

                    return;

                }


                alert(
                    "Perfil actualizado correctamente."
                );

            }
        );

    }


    // ==========================
    // EGRESADOS
    // ==========================

    const formEgresado =
        document.getElementById("formEgresado");

    if (formEgresado) {

        formEgresado.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const cedulaElemento =
                    document.getElementById("cedula");

                const nombreElemento =
                    document.getElementById("nombre");

                const correoElemento =
                    document.getElementById("correo");


                if (
                    !cedulaElemento ||
                    !nombreElemento ||
                    !correoElemento
                ) {

                    return;

                }


                const cedula =
                    cedulaElemento.value.trim();

                const nombre =
                    nombreElemento.value.trim();

                const correo =
                    correoElemento.value.trim();


                if (cedula === "") {

                    alert(
                        "Ingrese la cédula."
                    );

                    return;

                }


                if (nombre === "") {

                    alert(
                        "Ingrese el nombre."
                    );

                    return;

                }


                if (correo === "") {

                    alert(
                        "Ingrese el correo."
                    );

                    return;

                }


                alert(
                    "Egresado registrado correctamente."
                );


                formEgresado.reset();

            }
        );

    }


    // ==========================
    // TITULOS
    // ==========================

    const formTitulo =
        document.getElementById("formTitulo");

    if (formTitulo) {

        formTitulo.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();


                const tituloElemento =
                    document.getElementById("titulo");

                const codigoElemento =
                    document.getElementById("codigo");


                if (
                    !tituloElemento ||
                    !codigoElemento
                ) {

                    return;

                }


                const titulo =
                    tituloElemento.value.trim();

                const codigo =
                    codigoElemento.value.trim();


                if (titulo === "") {

                    alert(
                        "Ingrese el nombre del título."
                    );

                    return;

                }


                if (codigo === "") {

                    alert(
                        "Ingrese el código."
                    );

                    return;

                }


                alert(
                    "Título registrado correctamente."
                );


                formTitulo.reset();

            }
        );

    }


    // ==========================
    // BOTONES
    // ==========================

    const botones =
        document.querySelectorAll("button");


    botones.forEach(
        function (boton) {

            boton.addEventListener(
                "mouseover",
                function () {

                    if (!boton.disabled) {

                        boton.style.opacity =
                            "0.9";

                    }

                }
            );


            boton.addEventListener(
                "mouseout",
                function () {

                    boton.style.opacity =
                        "1";

                }
            );

        }
    );


    // ==========================
    // TABLAS
    // ==========================

    const filas =
        document.querySelectorAll(
            "tbody tr"
        );


    filas.forEach(
        function (fila) {

            fila.addEventListener(
                "click",
                function () {

                    alert(
                        "Registro seleccionado."
                    );

                }
            );

        }
    );

});