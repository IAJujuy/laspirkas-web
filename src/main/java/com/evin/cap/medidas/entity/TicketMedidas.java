package com.evin.cap.medidas.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ticket_medidas")
public class TicketMedidas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_ticket", nullable = false, unique = true, length = 40)
    private String numeroTicket;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    @Column(nullable = false, length = 20)
    private String patente;

    @Column(length = 20)
    private String acoplado;

    @Column(length = 120)
    private String transportista;

    @Column(length = 120)
    private String chofer;

    @Column(name = "largo_metros", nullable = false, precision = 10, scale = 2)
    private BigDecimal largoMetros;

    @Column(name = "ancho_metros", nullable = false, precision = 10, scale = 2)
    private BigDecimal anchoMetros;

    @Column(name = "alto_metros", nullable = false, precision = 10, scale = 2)
    private BigDecimal altoMetros;

    @Column(length = 500)
    private String observaciones;

    public TicketMedidas() {
    }

    public Long getId() {
        return id;
    }

    public String getNumeroTicket() {
        return numeroTicket;
    }

    public void setNumeroTicket(String numeroTicket) {
        this.numeroTicket = numeroTicket;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getAcoplado() {
        return acoplado;
    }

    public void setAcoplado(String acoplado) {
        this.acoplado = acoplado;
    }

    public String getTransportista() {
        return transportista;
    }

    public void setTransportista(String transportista) {
        this.transportista = transportista;
    }

    public String getChofer() {
        return chofer;
    }

    public void setChofer(String chofer) {
        this.chofer = chofer;
    }

    public BigDecimal getLargoMetros() {
        return largoMetros;
    }

    public void setLargoMetros(BigDecimal largoMetros) {
        this.largoMetros = largoMetros;
    }

    public BigDecimal getAnchoMetros() {
        return anchoMetros;
    }

    public void setAnchoMetros(BigDecimal anchoMetros) {
        this.anchoMetros = anchoMetros;
    }

    public BigDecimal getAltoMetros() {
        return altoMetros;
    }

    public void setAltoMetros(BigDecimal altoMetros) {
        this.altoMetros = altoMetros;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}