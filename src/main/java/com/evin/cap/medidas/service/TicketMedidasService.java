package com.evin.cap.medidas.service;

import com.evin.cap.medidas.dto.TicketMedidasDto;
import com.evin.cap.medidas.entity.TicketMedidas;

import java.util.List;

public interface TicketMedidasService {

    TicketMedidas crearTicket(TicketMedidasDto dto);

    List<TicketMedidas> listarTickets();

    TicketMedidas buscarPorId(Long id);
}
