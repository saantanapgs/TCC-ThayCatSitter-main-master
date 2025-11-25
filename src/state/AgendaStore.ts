import { useState, useEffect } from "react";

export interface AgendaItem {
  id: string;
  client: string;
  pet: string;
  type: "pernoite" | "diaria";
  date: string;
  time: string;
  address: string;
  status: "agendado" | "concluido";
}

// Estado global
let agenda: AgendaItem[] = [];
let listeners: (() => void)[] = [];
let nextId = 1;

// Adiciona agendamento
export const addAppointment = (newAppointment: Omit<AgendaItem, "id">) => {
  const appointment: AgendaItem = { ...newAppointment, id: (nextId++).toString() };
  agenda = [appointment, ...agenda];
  notifyListeners();
};

// Pega agenda de um cliente
export const getAppointmentsByClient = (clientName: string): AgendaItem[] =>
  agenda.filter(item => item.client === clientName)
        .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Pega toda agenda
export const getAllAppointments = (): AgendaItem[] =>
  [...agenda].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// Inscreve um listener
export const subscribeToAgenda = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  }
}

// Notifica todos os listeners
const notifyListeners = () => listeners.forEach(l => l());
