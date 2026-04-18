package com.evin.cap.medidas.service.impl;

import com.evin.cap.medidas.dto.TicketMedidasDto;
import com.evin.cap.medidas.entity.TicketMedidas;
import com.evin.cap.medidas.repository.TicketMedidasRepository;
import com.evin.cap.medidas.service.TicketMedidasService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class TicketMedidasServiceImpl implements TicketMedidasService {

    private final TicketMedidasRepository repository;

    public TicketMedidasServiceImpl(TicketMedidasRepository repository) {
        this.repository = repository;
    }

    @Override
    public TicketMedidas crearTicket(TicketMedidasDto dto) {
        TicketMedidas ticket = new TicketMedidas();
        ticket.setNumeroTicket(generarNumeroTicket());
        ticket.setFechaHora(LocalDateTime.now());
        ticket.setPatente(dto.getPatente());
        ticket.setAcoplado(dto.getAcoplado());
        ticket.setTransportista(dto.getTransportista());
        ticket.setChofer(dto.getChofer());
        ticket.setLargoMetros(dto.getLargoMetros());
        ticket.setAnchoMetros(dto.getAnchoMetros());
        ticket.setAltoMetros(dto.getAltoMetros());
        ticket.setObservaciones(dto.getObservaciones());

        return repository.save(ticket);
    }

    @Override
    public List<TicketMedidas> listarTickets() {
        return repository.findAll();
    }

    @Override
    public TicketMedidas buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket no encontrado con id: " + id));
    }

    private String generarNumeroTicket() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss-SSS");
        String numeroTicket;

        do {
            int sufijo = ThreadLocalRandom.current().nextInt(100, 1000);
            numeroTicket = "TM-" + LocalDateTime.now().format(formatter) + "-" + sufijo;
        } while (repository.existsByNumeroTicket(numeroTicket));

        return numeroTicket;
    }
}