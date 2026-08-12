const API_URL = "http://localhost:3000/oportunidades-laborales";

const formulario = document.getElementById("formOportunidad");
const tabla = document.getElementById("tablaOportunidades");
const mensaje = document.getElementById("mensaje");


// GET - CONSULTAR OPORTUNIDADES


async function cargarOportunidades() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las oportunidades.");
        }

        const oportunidades = await respuesta.json();

        mostrarOportunidades(oportunidades);

    } catch (error) {

        console.error("Error:", error);

        mensaje.textContent =
            "Error al cargar las oportunidades laborales.";

        mensaje.style.color = "red";
    }
}

// MOSTRAR DATOS EN LA TABLA


function mostrarOportunidades(oportunidades) {

    tabla.innerHTML = "";

    oportunidades.forEach(function (oportunidad) {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${oportunidad.empresa || ""}</td>

            <td>${oportunidad.puesto || ""}</td>

            <td>${oportunidad.areaProfesional || ""}</td>

            <td>${oportunidad.modalidad || ""}</td>

            <td>${oportunidad.ubicacion || ""}</td>

            <td>${formatearFecha(oportunidad.fechaPublicacion)}</td>

            <td>${formatearFecha(oportunidad.fechaVencimiento)}</td>

            <td>${oportunidad.contacto || ""}</td>

            <td>${oportunidad.estado || ""}</td>
        `;

        tabla.appendChild(fila);
    });
}


// FORMATEAR FECHAS

function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }

    return new Date(fecha).toLocaleDateString("es-CR");
}


// POST - REGISTRAR OPORTUNIDAD

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const oportunidad = {

        publicadoPor: "6a6bfd5a5feb7bdc9243b743",

        empresa: document.getElementById("empresa").value,

        puesto: document.getElementById("puesto").value,

        descripcion: document.getElementById("descripcion").value,

        areaProfesional:
            document.getElementById("areaProfesional").value,

        modalidad:
            document.getElementById("modalidad").value,

        ubicacion:
            document.getElementById("ubicacion").value,

        fechaPublicacion:
            document.getElementById("fechaPublicacion").value,

        fechaVencimiento:
            document.getElementById("fechaVencimiento").value,

        contacto:
            document.getElementById("contacto").value,

        estado:
            document.getElementById("estado").value
    };


    try {

        const respuesta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(oportunidad)
        });


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo registrar la oportunidad."
            );
        }


        mensaje.textContent =
            "¡Oportunidad laboral registrada correctamente!";

        mensaje.style.color = "green";


        // Limpiar formulario

        formulario.reset();


        // Actualizar tabla

        await cargarOportunidades();


    } catch (error) {

        console.error("Error:", error);

        mensaje.textContent =
            "Error al registrar la oportunidad laboral.";

        mensaje.style.color = "red";
    }

});
