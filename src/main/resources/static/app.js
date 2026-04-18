const API_BASE = "/api/tickets-medidas";

document.addEventListener("DOMContentLoaded", () => {
    inicializarFormulario();
    inicializarVistaTicket();
    inicializarImpresion();
});

function inicializarFormulario() {
    const form = document.getElementById("ticketForm");
    if (!form) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = document.getElementById("submitButton");
        const formMessage = document.getElementById("formMessage");

        limpiarMensaje(formMessage);
        submitButton.disabled = true;
        submitButton.textContent = "Guardando...";

        const payload = {
            patente: obtenerValor("patente"),
            acoplado: obtenerValor("acoplado"),
            transportista: obtenerValor("transportista"),
            chofer: obtenerValor("chofer"),
            largoMetros: convertirNumero("largoMetros"),
            anchoMetros: convertirNumero("anchoMetros"),
            altoMetros: convertirNumero("altoMetros"),
            observaciones: obtenerValor("observaciones")
        };

        try {
            const response = await fetch(API_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "No se pudo guardar el ticket.");
            }

            const ticketCreado = await response.json();

            mostrarMensaje(formMessage, "success", "Ticket guardado correctamente. Redirigiendo...");

            window.location.href = `/ticket.html?id=${ticketCreado.id}`;
        } catch (error) {
            mostrarMensaje(formMessage, "error", "Error al guardar el ticket. Revisar datos o backend.");
            console.error(error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Guardar y generar ticket";
        }
    });
}

function inicializarVistaTicket() {
    const numeroTicketElement = document.getElementById("numeroTicket");
    if (!numeroTicketElement) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("No se recibió el id del ticket.");
        window.location.href = "/";
        return;
    }

    cargarTicket(id);
}

async function cargarTicket(id) {
    try {
        const response = await fetch(`${API_BASE}/${id}`);

        if (!response.ok) {
            throw new Error("No se pudo obtener el ticket.");
        }

        const ticket = await response.json();

        setText("numeroTicket", ticket.numeroTicket || "-");
        setText("fechaHora", formatearFechaHora(ticket.fechaHora));
        setText("patente", ticket.patente || "-");
        setText("acoplado", ticket.acoplado || "-");
        setText("transportista", ticket.transportista || "-");
        setText("chofer", ticket.chofer || "-");
        setText("largoMetros", formatearMedida(ticket.largoMetros));
        setText("anchoMetros", formatearMedida(ticket.anchoMetros));
        setText("altoMetros", formatearMedida(ticket.altoMetros));
        setText("observaciones", ticket.observaciones || "-");
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar el ticket.");
        window.location.href = "/";
    }
}

function inicializarImpresion() {
    const printButton = document.getElementById("printButton");
    if (!printButton) {
        return;
    }

    printButton.addEventListener("click", () => {
        window.print();
    });
}

function obtenerValor(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function convertirNumero(id) {
    const value = obtenerValor(id);
    return value === "" ? null : Number(value);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function formatearFechaHora(fechaHoraIso) {
    if (!fechaHoraIso) {
        return "-";
    }

    const fecha = new Date(fechaHoraIso);

    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(fecha);
}

function formatearMedida(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "-";
    }

    const numero = Number(valor);

    if (Number.isNaN(numero)) {
        return "-";
    }

    return `${numero.toFixed(2)} m`;
}

function mostrarMensaje(container, tipo, mensaje) {
    if (!container) {
        return;
    }

    container.className = `form-message ${tipo}`;
    container.textContent = mensaje;
}

function limpiarMensaje(container) {
    if (!container) {
        return;
    }

    container.className = "form-message";
    container.textContent = "";
}