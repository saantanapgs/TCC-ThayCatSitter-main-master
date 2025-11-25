import { useState, useEffect } from "react";
import { AgendaItem, getAllAppointments, subscribeToAgenda } from "./AgendaStore";

export const useAgendaData = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>(getAllAppointments());

  useEffect(() => {
    const update = () => setAgenda(getAllAppointments());
    const unsubscribe = subscribeToAgenda(update);
    return () => unsubscribe();
  }, []);

  return agenda;
};
