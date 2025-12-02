import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://catsitterapidb-main.onrender.com";

export interface Service {
  time: string;
  id: number;
  petName: string;
  serviceType: string;
  date: string;
  notes?: string;
  userId: number;
  adminId: number;
  user?: {
    name: string;
    email: string;
  };
  price: number;
  status?: string; 
}

export function useServicesData(adminId?: number) {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");

      let res;

      if (typeof adminId === "number" && !isNaN(adminId)) {
        res = await axios.get(`${API_URL}/services/admin/${adminId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
      } 
      else if (storedUserId) {
        res = await axios.get(`${API_URL}/services/user/${storedUserId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
      } 
      else {
        res = await axios.get(`${API_URL}/services`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
      }

      setAllServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
      setAllServices([]);
    } finally {
      setLoading(false);
    }
  }, [adminId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await fetchServices();
    })();
    return () => { mounted = false; };
  }, [fetchServices]);

  // 🔥 CORREÇÃO DO ERRO 404 – CHAMANDO O ENDPOINT CORRETO
  const updateServiceStatus = useCallback(
    async (serviceId: number, newStatus: string) => {
      try {
        const token = await AsyncStorage.getItem("token");

        // backend exige EXATAMENTE /services/:id/concluir
        await axios.patch(
          `${API_URL}/services/${serviceId}/concluir`,
          {}, 
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        await fetchServices(); // atualiza lista
      } catch (err) {
        console.error("Erro ao atualizar status do serviço:", err);
        throw err;
      }
    },
    [fetchServices]
  );

  const services =
    typeof adminId === "number" && !isNaN(adminId)
      ? allServices.filter(
          (service) => Number(service.adminId) === Number(adminId)
        )
      : allServices;

  const totalRevenue = services.reduce((acc, s) => acc + (s.price || 0), 0);
  const uniqueClients = new Set(services.map((s) => s.userId)).size;

  const currentMonth = new Date().getMonth();
  const servicesThisMonth = services.filter(
    (s) => new Date(s.date).getMonth() === currentMonth
  ).length;

  const recentServices = [...services]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const agendados = services.filter((s) => s.status !== "concluido");
  const concluidos = services.filter((s) => s.status === "concluido");

  return {
    loading,
    totalRevenue,
    activeClients: uniqueClients,
    servicesThisMonth,
    recentServices,

    agendados,
    concluidos,

    refresh: fetchServices,
    updateServiceStatus,
  };
}
