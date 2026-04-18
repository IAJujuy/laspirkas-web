package com.evin.cap.medidas.repository;

import com.evin.cap.medidas.entity.TicketMedidas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketMedidasRepository extends JpaRepository<TicketMedidas, Long> {
    boolean existsByNumeroTicket(String numeroTicket);
}
