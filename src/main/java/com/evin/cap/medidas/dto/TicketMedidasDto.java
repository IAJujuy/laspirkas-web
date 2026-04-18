package com.evin.cap.medidas.dto;

import java.math.BigDecimal;

public class TicketMedidasDto {

    private String patente;
    private String acoplado;
    private String transportista;
    private String chofer;
    private BigDecimal largoMetros;
    private BigDecimal anchoMetros;
    private BigDecimal altoMetros;
    private String observaciones;

    public TicketMedidasDto() {
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