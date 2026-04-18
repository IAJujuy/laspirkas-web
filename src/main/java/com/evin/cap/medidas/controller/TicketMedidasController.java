package com.evin.cap.medidas.controller;

import com.evin.cap.medidas.dto.TicketMedidasDto;
import com.evin.cap.medidas.entity.TicketMedidas;
import com.evin.cap.medidas.service.TicketMedidasService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets-medidas")
public class TicketMedidasController {

    private final TicketMedidasService ticketMedidasService;

    public TicketMedidasController(TicketMedidasService ticketMedidasService) {
        this.ticketMedidasService = ticketMedidasService;
    }

    @PostMapping
    public ResponseEntity<TicketMedidas> crearTicket(@RequestBody TicketMedidasDto dto) {
        TicketMedidas ticketCreado = ticketMedidasService.crearTicket(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketCreado);
    }

    @GetMapping
    public ResponseEntity<List<TicketMedidas>> listarTickets() {
        return ResponseEntity.ok(ticketMedidasService.listarTickets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketMedidas> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ticketMedidasService.buscarPorId(id));
    }
}
