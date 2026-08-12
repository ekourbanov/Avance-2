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

