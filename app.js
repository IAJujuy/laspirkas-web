const STORAGE_KEY = "interjama_ticket_actual";

document.addEventListener("DOMContentLoaded", () => {
    inicializarFormulario();
    inicializarVistaTicket();
    inicializarImpresion();
    inicializarPesaje();
});

function inicializarFormulario() {
    const form = document.getElementById("ticketForm");
    if (!form) {
        return;
    }

    const submitButton = document.getElementById("submitButton");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    form.addEventListener("keydown", (event) => {
        const tagName = event.target && event.target.tagName ? event.target.tagName.toUpperCase() : "";
        if (event.key === "Enter" && tagName !== "TEXTAREA") {
            event.preventDefault();
        }
    });

    if (submitButton) {
        submitButton.addEventListener("click", () => {
            generarTicketParaImprimir();
        });

        submitButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
            }
        });
    }

    form.addEventListener("reset", () => {
        const formMessage = document.getElementById("formMessage");
        limpiarMensaje(formMessage);
        setTimeout(actualizarPesoMercaderia, 0);
    });
}

function generarTicketParaImprimir() {
    const form = document.getElementById("ticketForm");
    const formMessage = document.getElementById("formMessage");

    if (form && !form.reportValidity()) {
        return;
    }

    const ahora = new Date();
    const ticket = {
        numeroTicket: construirNumeroTicket(ahora),
        fechaHora: ahora.toISOString(),
        patente: obtenerValor("patente"),
        acoplado: obtenerValor("acoplado"),
        transportista: obtenerValor("transportista"),
        cuit: obtenerValor("cuit"),
        chofer: obtenerValor("chofer"),
        dni: obtenerValor("dni"),
        largoMetros: convertirNumero("largoMetros"),
        anchoMetros: convertirNumero("anchoMetros"),
        altoMetros: convertirNumero("altoMetros"),
        taraKg: convertirNumero("taraKg"),
        brutoKg: convertirNumero("brutoKg"),
        mercaderiaKg: convertirNumero("mercaderiaKg"),
        observaciones: obtenerValor("observaciones")
    };

    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ticket));
        mostrarMensaje(formMessage, "success", "Ticket generado correctamente. Abriendo vista para imprimir...");
        window.location.href = "ticket.html";
    } catch (error) {
        console.error(error);
        mostrarMensaje(formMessage, "error", "No se pudo preparar el ticket para impresión.");
    }
}

function construirNumeroTicket(fecha) {
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, "0");
    const dd = String(fecha.getDate()).padStart(2, "0");
    const hh = String(fecha.getHours()).padStart(2, "0");
    const mi = String(fecha.getMinutes()).padStart(2, "0");
    const ss = String(fecha.getSeconds()).padStart(2, "0");
    return `TM-${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
}

function inicializarPesaje() {
    const tara = document.getElementById("taraKg");
    const bruto = document.getElementById("brutoKg");

    if (!tara || !bruto) {
        return;
    }

    tara.addEventListener("input", actualizarPesoMercaderia);
    bruto.addEventListener("input", actualizarPesoMercaderia);
    actualizarPesoMercaderia();
}

function actualizarPesoMercaderia() {
    const tara = convertirNumero("taraKg");
    const bruto = convertirNumero("brutoKg");
    const mercaderiaInput = document.getElementById("mercaderiaKg");

    if (!mercaderiaInput) {
        return;
    }

    if (tara === null || bruto === null) {
        mercaderiaInput.value = "";
        return;
    }

    const neto = bruto - tara;
    mercaderiaInput.value = neto >= 0 ? neto.toFixed(2) : "";
}

function inicializarVistaTicket() {
    const numeroTicketElement = document.getElementById("numeroTicket");
    if (!numeroTicketElement) {
        return;
    }

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
        alert("No hay un ticket generado para mostrar.");
        window.location.href = "/";
        return;
    }

    try {
        const ticket = JSON.parse(raw);
        setText("numeroTicket", ticket.numeroTicket || "-");
        setText("fechaHora", formatearFechaHora(ticket.fechaHora));
        setText("patente", ticket.patente || "-");
        setText("acoplado", ticket.acoplado || "-");
        setText("transportista", ticket.transportista || "-");
        setText("cuit", ticket.cuit || "-");
        setText("chofer", ticket.chofer || "-");
        setText("dni", ticket.dni || "-");
        setText("largoMetros", formatearMedida(ticket.largoMetros));
        setText("anchoMetros", formatearMedida(ticket.anchoMetros));
        setText("altoMetros", formatearMedida(ticket.altoMetros));
        setText("taraKg", formatearPeso(ticket.taraKg));
        setText("brutoKg", formatearPeso(ticket.brutoKg));
        setText("mercaderiaKg", formatearPeso(ticket.mercaderiaKg));
        setText("observaciones", ticket.observaciones || "-");
    } catch (error) {
        console.error(error);
        alert("No se pudo cargar el ticket generado.");
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

function formatearPeso(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "-";
    }

    const numero = Number(valor);
    if (Number.isNaN(numero)) {
        return "-";
    }

    return `${numero.toFixed(2)} kg`;
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
