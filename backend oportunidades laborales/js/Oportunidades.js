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