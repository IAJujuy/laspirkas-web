(function () {
    const STORAGE_KEY = 'interjamaTicketDemo';

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function formatDate(date) {
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
    }

    function formatTime(date) {
        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    function generateTicketNumber(date) {
        return `TM-${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
    }

    function setText(id, value, suffix) {
        const element = document.getElementById(id);
        if (!element) {
            return;
        }
        const normalized = value && String(value).trim() ? String(value).trim() : '-';
        element.textContent = suffix && normalized !== '-' ? `${normalized} ${suffix}` : normalized;
    }

    function saveTicket(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function readTicket() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }
        try {
            return JSON.parse(raw);
        } catch (error) {
            return null;
        }
    }

    const form = document.getElementById('ticketForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const now = new Date();
            const formData = new FormData(form);
            const payload = {
                numeroTicket: generateTicketNumber(now),
                fecha: formatDate(now),
                hora: formatTime(now),
                fechaHora: `${formatDate(now)} ${formatTime(now)}`,
                patente: formData.get('patente') || '',
                acoplado: formData.get('acoplado') || '',
                transportista: formData.get('transportista') || '',
                chofer: formData.get('chofer') || '',
                largoMetros: formData.get('largoMetros') || '',
                anchoMetros: formData.get('anchoMetros') || '',
                altoMetros: formData.get('altoMetros') || '',
                puesto: formData.get('puesto') || 'Paso de Jama',
                observaciones: formData.get('observaciones') || ''
            };

            saveTicket(payload);
            window.location.href = 'ticket.html';
        });

        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', function () {
                const message = document.getElementById('formMessage');
                if (message) {
                    message.textContent = '';
                    message.className = 'form-message';
                }
            });
        }
    }

    const ticketContainer = document.getElementById('ticketContainer');
    if (ticketContainer) {
        const data = readTicket();
        if (!data) {
            window.location.href = 'index.html';
            return;
        }

        setText('numeroTicket', data.numeroTicket);
        setText('fechaHora', data.fechaHora);
        setText('puesto', data.puesto);
        setText('patente', data.patente);
        setText('acoplado', data.acoplado);
        setText('transportista', data.transportista);
        setText('chofer', data.chofer);
        setText('largoMetros', data.largoMetros, 'm');
        setText('anchoMetros', data.anchoMetros, 'm');
        setText('altoMetros', data.altoMetros, 'm');
        setText('observaciones', data.observaciones);

        const printButton = document.getElementById('printButton');
        if (printButton) {
            printButton.addEventListener('click', function () {
                window.print();
            });
        }
    }
})();
